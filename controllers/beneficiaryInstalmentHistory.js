
const BeneficiaryInstalmentHistory = require("../models/beneficiary_instalment_history");
const InstalmentLine = require('../models/Instalment_line')
const ParticiPantIncome = require('../models/participant_income')
const { Types } = require("mongoose");
const { generateNameServerSide } = require("../utils/generalUtils");
const UserModel = require('../models/user')
const RewardLines = require('../models/reward_line')
const InstalmentLines = require('../models/Instalment_line')
const AccountStakeHolder = require('../models/participant_account_participants')
const StakeholderAccountHistory = require('../models/stakeholder_account_history');
const { json } = require("body-parser");
module.exports = {
    async getBeneficiaryInstalmentHistories(req, res) {
        try {
            
        const beneficiaries = await BeneficiaryInstalmentHistory.find()
        res.json(beneficiaries)
        } catch (err) {
            throw err;
        }
    },
    async addBeneficiaryInstalmentHistory(req, res) {
        const { name } = req.body;
        try {
        const newBeneficiaryInstalmentHistory = new BeneficiaryInstalmentHistory({
            ...req.body,
        })
        // Check if user already exist
        const test_beneficiary = await BeneficiaryInstalmentHistory.findOne({ name })
        if (test_beneficiary) return res.status(400).json({ message: "BeneficiaryInstalmentHistory already registered." });

        const beneficiary = await newBeneficiaryInstalmentHistory.save();
        res.json({
            ...beneficiary,
        })

        } catch (err) {
            throw err;
        }

    },
    async getBeneficiaryInstalmentHistoryByBeneficiaryId(req, res){
        const beneficiary_id = req.params.beneficiary_id;
        if (!beneficiary_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const beneficiary_instalment_histories = await BeneficiaryInstalmentHistory.find({ 'beneficiary._id': beneficiary_id  })
            res.json(beneficiary_instalment_histories)
        } catch (err) {
            throw err;
        }
    },
    async getBeneficiaryInstalmentHistoryById(req, res){
        const id = req.params.id;
        if (!id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const beneficiary_instalment_history = await BeneficiaryInstalmentHistory.findOne({ _id: Types.ObjectId(id)  })
            res.json(beneficiary_instalment_history)
        } catch (err) {
            throw err;
        }
    },
    async editBeneficiaryInstalmentHistoryById(req, res){
        const { _id, status } = req.body;
        if (!_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const beneficiary_instalment_history = await BeneficiaryInstalmentHistory.findOneAndUpdate({ _id: Types.ObjectId(_id) },{
            ...req.body, status: 'draft',
        })
        


        if (beneficiary_instalment_history === null)return res.status(400).json({ message: "No Beneficiary Instalment History with this id" });
        // check if status = paid meaning confirm button where press on front end
        if (status === "paid") {
            // check if beneficiary is a collaborator or an elite
            let _beneficiary = await UserModel.findById(beneficiary_instalment_history?.beneficiary?._id) 
            // console.log('_beneficiary', _beneficiary)
            // return;
            
        if (!('parent' in _beneficiary)) return res.status(400).json({ message: "Beneficiary must be attached to either an elite or a collaborator. Please do add a parent" });

            if ( _beneficiary.parent?.is_collaborator === 'true') {
                console.log('In is_collaborator', _beneficiary.parent?.is_collaborator, )
                console.log('In is_collaborator instanceof',  typeof(_beneficiary.parent?.is_collaborator), )
                // get beneficiary collaborator and collaborator elite
                let _collaborator =  await AccountStakeHolder.findOne({'participant._id': _beneficiary.parent._id})
                let _elite =  await AccountStakeHolder.findOne({'participant._id': _beneficiary.parent.parent_id})
                
                // console.log('_collaborator', _collaborator)
                // console.log('\n\n _elite', _elite)
                // return;
                // load reward for collaborator assigned to this beneficiary installment
                let _installment_line = await InstalmentLines.findById(beneficiary_instalment_history.paid_instalment_line?._id)
                let _reward_lines = await RewardLines.find({'parent._id': _installment_line?.reward?._id, 'is_collaborator': true})
                // console.log('_installment_line', _installment_line)
                // return res.json(_reward_lines)
                let _common_account_percentage_and_amount = _reward_lines.filter(item=>item.reward_type === 'common')[0]
                let _elite_account_percentage_and_amount = _reward_lines.filter(item=>item.reward_type === 'elite')[0]
                let _collaborator_account_percentage_and_amount = _reward_lines.filter(item=>item.reward_type === 'collaborator')[0]

                let _common_account_reward = parseFloat(_installment_line?.reward?.reward_amount)*((parseInt(_common_account_percentage_and_amount?.reward_percentage_of_amount)/100))
                let _elite_account_reward = parseFloat(_installment_line?.reward?.reward_amount)*((parseInt(_elite_account_percentage_and_amount?.reward_percentage_of_amount)/100))
                let _collaborator_account_reward = parseFloat(_installment_line?.reward?.reward_amount)*((parseInt(_collaborator_account_percentage_and_amount?.reward_percentage_of_amount)/100))

                
                // console.log('_installment_line', _installment_line)
                // console.log('\n\n _common_account_percentage_and_amount', _common_account_percentage_and_amount)
                // console.log('\n\n _collaborator_account_percentage_and_amount', _collaborator_account_percentage_and_amount)
                // return;
                
                // console.log('\n\n _common_account_reward : ', _common_account_reward)
                // console.log('- _installment_line?.reward?.reward_amount', _installment_line?.reward?.reward_amount)
                // console.log('- _common_account_percentage_and_amount?.reward_percentage_of_amount', _common_account_percentage_and_amount?.reward_percentage_of_amount)

                // console.log('\n\n _elite_account_reward', _elite_account_reward)
                // console.log('\n\n _collaborator_account_reward', _collaborator_account_reward)
                // return;

                // credit appropriate account :
                // - collaborator of the beneficiary
                let res_1 = await new StakeholderAccountHistory({
                    status: 'approved',
                    is_credit: true,
                    participant_account_participant: [_elite, _collaborator],
                    note: `CA: Payment of ${_common_account_reward} received for completing of ${_beneficiary.first_name}, ${_beneficiary.last_name} installment ${beneficiary_instalment_history.name}.\n This represent ${_common_account_percentage_and_amount?.reward_percentage_of_amount} % of ${_common_account_percentage_and_amount?.parent?.reward_amount} the reward for this installment `,
                    name: generateNameServerSide('ACC_STM_HIS'),
                    amount: parseFloat(_common_account_reward).toFixed(2),
                    approver: {email: 'system.bot@no_replay.com', is_staff: true, first_name: 'System', last_name: ' Bot'},
                    participant_account: _beneficiary.parents_common_account,
                    account_id: _beneficiary.parents_common_account_id,
                    created_by: {email: 'system.bot@no_replay.com', is_staff: true, first_name: 'System', last_name: ' Bot'},
                }).save();  


                // - elite of beneficiary's collaborator                
                let res_2 = await new StakeholderAccountHistory({
                    status: 'approved',
                    is_credit: true,
                    participant_account_participant: [_elite],
                    note: `ELA: Payment of ${_elite_account_reward} received for completing of ${_beneficiary.first_name}, ${_beneficiary.last_name} installment ${beneficiary_instalment_history.name}.\n This represent ${_elite_account_percentage_and_amount.reward_percentage_of_amount} % of ${_elite_account_percentage_and_amount?.parent?.reward_amount} the reward for this installment `,
                    name: generateNameServerSide('ACC_STM_HIS'),
                    amount: parseFloat(_elite_account_reward).toFixed(2),
                    approver: {email: 'system.bot@no_replay.com', is_staff: true, first_name: 'System', last_name: ' Bot'},
                    participant_account: _beneficiary.collaborator_elite_account,
                    account_id: _beneficiary.collaborator_elite_account_id,
                    created_by: {email: 'system.bot@no_replay.com', is_staff: true, first_name: 'System', last_name: ' Bot'},
                }).save();

                // - collaborator of beneficiary's collaborator                
                let res_3 = await new StakeholderAccountHistory({
                    status: 'approved',
                    is_credit: true,
                    participant_account_participant: [_collaborator],
                    note: `CA: Payment of ${_collaborator_account_reward} received for completing of ${_beneficiary.first_name}, ${_beneficiary.last_name} installment ${beneficiary_instalment_history.name}.\n This represent ${_collaborator_account_percentage_and_amount.reward_percentage_of_amount} % of ${_collaborator_account_percentage_and_amount?.parent?.reward_amount} the reward for this installment `,
                    name: generateNameServerSide('ACC_STM_HIS'),
                    amount: parseFloat(_collaborator_account_reward).toFixed(2),
                    approver: {email: 'system.bot@no_replay.com', is_staff: true, first_name: 'System', last_name: ' Bot'},
                    participant_account: _beneficiary.parent_collaborator_account,
                    account_id: _beneficiary.parent_collaborator_account_id,
                    created_by: {email: 'system.bot@no_replay.com', is_staff: true, first_name: 'System', last_name: ' Bot'},
                }).save();

                // console.log('res_1', res_1)
                // console.log('res_1', res_2)
                // console.log('res_1', res_3)
                
                // return res.json(res_1, res_2, res_3)
            } else if (_beneficiary.parent?.is_lead === 'true') {
                
                console.log('In is_lead', _beneficiary.parent?.is_lead, )
                console.log('In is_lead instanceof',  typeof(_beneficiary.parent?.is_lead), )

                let _elite =  await AccountStakeHolder.findOne({'participant._id': _beneficiary.parent._id})

                // load reward for elite assigned to this beneficiary installment
                let _installment_line = await InstalmentLines.findById(beneficiary_instalment_history.paid_instalment_line?._id)
                let _reward_lines = await RewardLines.find({'parent._id': _installment_line?.reward?._id, 'is_elite': true})
                
                let _common_account_percentage_and_amount = _reward_lines.filter(item=>item.reward_type === 'common')[0]
                let _elite_account_percentage_and_amount = _reward_lines.filter(item=>item.reward_type === 'elite')[0]

                let _common_account_reward = parseFloat(_installment_line?.reward?.reward_amount)*((parseInt(_common_account_percentage_and_amount?.reward_percentage_of_amount)/100))
                let _elite_account_reward = parseFloat(_installment_line?.reward?.reward_amount)*((parseInt(_elite_account_percentage_and_amount?.reward_percentage_of_amount)/100))
                
                let res_1 = await new StakeholderAccountHistory({
                    status: 'approved',
                    is_credit: true,
                    participant_account_participant: [_elite],
                    note: `CA: Payment of ${_common_account_reward} received for completing of ${_beneficiary.first_name}, ${_beneficiary.last_name} installment ${beneficiary_instalment_history.name}.\n This represent ${_common_account_percentage_and_amount?.reward_percentage_of_amount} % of ${_common_account_percentage_and_amount?.parent?.reward_amount} the reward for this installment `,
                    name: generateNameServerSide('ACC_STM_HIS'),
                    amount: parseFloat(_common_account_reward).toFixed(2),
                    approver: {email: 'system.bot@no_replay.com', is_staff: true, first_name: 'System', last_name: ' Bot'},
                    participant_account: _beneficiary.parents_common_account,
                    account_id: _beneficiary.parents_common_account_id,
                    created_by: {email: 'system.bot@no_replay.com', is_staff: true, first_name: 'System', last_name: ' Bot'},
                }).save();  


                // - elite of beneficiary's collaborator                
                let res_2 = await new StakeholderAccountHistory({
                    status: 'approved',
                    is_credit: true,
                    participant_account_participant: [_elite],
                    note: `ELA: Payment of ${_elite_account_reward} received for completing of ${_beneficiary.first_name}, ${_beneficiary.last_name} installment ${beneficiary_instalment_history.name}.\n This represent ${_elite_account_percentage_and_amount.reward_percentage_of_amount} % of ${_elite_account_percentage_and_amount?.parent?.reward_amount} the reward for this installment `,
                    name: generateNameServerSide('ACC_STM_HIS'),
                    amount: parseFloat(_elite_account_reward).toFixed(2),
                    approver: {email: 'system.bot@no_replay.com', is_staff: true, first_name: 'System', last_name: ' Bot'},
                    participant_account: _beneficiary.collaborator_elite_account,
                    account_id: _beneficiary.collaborator_elite_account_id,
                    created_by: {email: 'system.bot@no_replay.com', is_staff: true, first_name: 'System', last_name: ' Bot'},
                }).save();
            }
        }
        // this save the update/edit
        await beneficiary_instalment_history.save()
        
        // logic end
        
         res.json(beneficiary_instalment_history)
        } catch (err) {
            throw err;
        }
    },
    async deleteBeneficiaryInstalmentHistoryById(req, res){
        const id = req.params.id;
        try {
            
        const beneficiary_instalment_history = await BeneficiaryInstalmentHistory.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (beneficiary_instalment_history === null)return res.status(400).json({ message: "No Beneficiary Instalment History with this id" });
        
         res.json(beneficiary_instalment_history)
        } catch (err) {
            throw err;
        }
    }
};

