
const StakeholderAccountHistory = require("../models/stakeholder_account_history");
const { Types } = require("mongoose");

module.exports = {
    async getStakeholderAccountHistoriesQuery(req, res) {
        let query = req.body
        try {
            const stakeholder_account_histories = await StakeholderAccountHistory.find(query)
            res.json(stakeholder_account_histories)
        } catch (err) {
            throw err;
        }
    },
    async getStakeholderAccountHistories(req, res) {
        try {
            
        const stakeholder_account_histories = await StakeholderAccountHistory.find()
        res.json(stakeholder_account_histories)
        } catch (err) {
            throw err;
        }
    },
    async addStakeholderAccountHistory(req, res) {
        const { name } = req.body;
        try {
        const newStakeholderAccountHistory = new StakeholderAccountHistory({
            ...req.body,
        })
        // Check if user already exist
        const stakeholders = await StakeholderAccountHistory.find({name})
        if (stakeholders.length > 0) return res.status(403).json({ message: "Stakeholder History already added" });

        const req_res = await newStakeholderAccountHistory.save();
        res.json({
            ...req_res,
        })

        } catch (err) {
            throw err;
        }

    },
    async getHistoryByStakeholderId(req, res){
        const stakeholder_id = req.params.stakeholder_id;
        if (!stakeholder_id) return res.status(403).json({ message: "Missing param" });

        try {
            console.log('stakeholder_id', stakeholder_id)
        const stakeholder_account_histories = await StakeholderAccountHistory.find({$or: [{ 'participant_account_participant._id': stakeholder_id} ]})
        // console.log('-- stakeholder_account_histories', stakeholder_account_histories)
            res.json(stakeholder_account_histories)
        } catch (err) {
            throw err;
        }
    },
    async getStakeholderAccountHistoryById(req, res){
        const id = req.params.id;
        if (!id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const stakeholder_account_history = await StakeholderAccountHistory.findOne({ _id: Types.ObjectId(id)  })
            res.json(stakeholder_account_history)
        } catch (err) {
            throw err;
        }
    },
    async editStakeholderAccountHistoryById(req, res){
        const { _id } = req.body;
        if (!_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const stakeholder_account_history = await StakeholderAccountHistory.findOneAndUpdate({ _id: Types.ObjectId(_id) },{
            ...req.body,
        })
        if (stakeholder_account_history === null)return res.status(400).json({ message: "No account history with this id" });
        
         res.json(stakeholder_account_history)
        } catch (err) {
            throw err;
        }
    },
    async deleteStakeholderAccountHistoryById(req, res){
        const id = req.params.id;
        try {
            
        const stakeholder_account_history = await StakeholderAccountHistory.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (stakeholder_account_history === null)return res.status(400).json({ message: "No account history with this id" });
        
         res.json(stakeholder_account_history)
        } catch (err) {
            throw err;
        }
    }
};

