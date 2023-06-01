
const User = require("../models/user");
const Instalment = require("../models/instalment");
const InstalmentLine = require("../models/Instalment_line");
const ParticipantIncome = require('../models/participant_income')
const BeneficiaryInstalmentHistoryModel = require('../models/beneficiary_instalment_history')
const CampaignParticipant = require('../models/campaign_participants')
module.exports = {
    async getGenerals(req, res) {
        try {
            
        const generals = await User.find({$or: [{is_beneficiary:true}, {is_collaborator:true}, {is_lead:true}]})
        res.json(generals)
        } catch (err) {
            throw err;
        }
    },
    async getGeneralsGeneric(req, res) {
        let query = req.body.query || {}
        try {
        const {auth_user_id, role_name} = query;
        if (auth_user_id && role_name ) {                
                let res_data_user = []
                    if (role_name !== 'cashier') {
                        res_data_user = await User.aggregate(
                            [
                                {
                                    $lookup: {
                                        from: 'cashier_centers',
                                        localField: 'center.name',
                                        foreignField: 'center.name',
                                        as: 'cashiers'
                                    }
                                },
                                {
                                    $match: {
                                        is_beneficiary: true,
                                        'cashiers.cashier._id': {
                                        $in: [auth_user_id]
                                        }
                                    }
                                }
                            ]
                        )
                        return res.json(res_data_user)
                    } 

        } else {                
            const res_data = await User.find(query)
            res.json(res_data)
        }
        } catch (err) {
            throw err;
        }
    },
    async editGenerals(req, res) {
        const filter = req.body.query || {}
        const body = req.body
        try {
            
        const res_data = await User.updateMany(filter, body)
            res.json(res_data)
        } catch (err) {
            throw err;
        }
    },
    async getGeneralInstallments(req, res) {
        let query = req.body.query || {}
        try {
            
        const res_data = await Instalment.find(query)
            res.json(res_data)
        } catch (err) {
            throw err;
        }
    },
    async getGeneralParticipantIncomes(req, res) {
        let query = req.body.query || {}
        try {
            
        const res_data = await ParticipantIncome.find(query)
            res.json(res_data)
        } catch (err) {
            throw err;
        }
    },
    async getGeneralCampaignParticipants(req, res) {
        let query = req.body.query || {}
        try {
            
        const res_data = await CampaignParticipant.find(query)
            res.json(res_data)
        } catch (err) {
            throw err;
        }
    },
    async getGeneralInstalmentLines(req, res) {
        let query = req.body.query || {}
        try {
            
        const res_data = await InstalmentLine.find(query)
            res.json(res_data)
        } catch (err) {
            throw err;
        }
    },
    async editGeneralInstalmentLines(req, res) {
        const filter = req.body.query || {}
        const body = req.body
        try {
            
        const res_data = await Instalment.updateMany(filter, body)
            res.json(res_data)
        } catch (err) {
            throw err;
        }
    },
    async editGeneralInstallments(req, res) {
        const filter = req.body.query || {}
        const body = req.body
        try {
            
        const res_data = await Instalment.updateMany(filter, body)
            res.json(res_data)
        } catch (err) {
            throw err;
        }
    },
    async getParticipantIncomesHistory(req, res) {
        const participant_id = req.params.participant_id
        // get all instalment history of all the beneficiary under a participant  
        let participant_beneficiaries_installments = await BeneficiaryInstalmentHistoryModel.find({'beneficiary.parent._id': participant_id});
        let incomes_group_by_beneficiaries = {}

        for (let i = 0; i < participant_beneficiaries_installments.length; i++) {
            const participant_beneficiaries_installment = participant_beneficiaries_installments[i];
            // compute participant reward : if all installment paid, 35000 Fcfa goes to his incomes 
            if (!incomes_group_by_beneficiaries.hasOwnProperty(`${participant_beneficiaries_installment.beneficiary._id}`)){
                incomes_group_by_beneficiaries[`${participant_beneficiaries_installment.beneficiary._id}`] ={}
            }
            incomes_group_by_beneficiaries[`${participant_beneficiaries_installment.beneficiary._id}`]['beneficiary'] = participant_beneficiaries_installment.beneficiary;
            
            if (!incomes_group_by_beneficiaries[`${participant_beneficiaries_installment.beneficiary._id}`].hasOwnProperty('incomes')){
            incomes_group_by_beneficiaries[`${participant_beneficiaries_installment.beneficiary._id}`]['incomes'] = []
            }
            if (participant_beneficiaries_installment.status === 'paid') {
                    
                incomes_group_by_beneficiaries[`${participant_beneficiaries_installment.beneficiary._id}`]['incomes'].push({
                    ...participant_beneficiaries_installment._doc
                })
            }
        }
        try {
            
            res.json(incomes_group_by_beneficiaries)
        } catch (err) {
            throw err;
        }
    },
}
