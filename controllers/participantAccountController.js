
// const User = require("../models/user");
const ParticipantAccount = require("../models/participant_account");
const { Types } = require("mongoose");

module.exports = {
    async getParticipantAccount(req, res) {
        // console.log('-- getParticipantAccount req.body', req.body)
        let query = req.body || {}
        try {
            
        const res_data = await ParticipantAccount.find(query)
            res.json(res_data)
        } catch (err) {
            throw err;
        }
    },
    async addParticipantAccount(req, res) {
        const {name} = req.body
        try {
        const newParticipantAccount = new ParticipantAccount({
            ...req.body,
        })
        const res_data = await ParticipantAccount.findOne({name})
        if (res_data) return res.status(400).json({ message: "Participant Account already registered." });

        const participant = await newParticipantAccount.save();
        res.json({
            ...participant,
        })

        } catch (err) {
            throw err;
        }

    },
    async editParticipantAccount(req, res) {
        const filter = req.body.query || {}
        const body = req.body
        try {
            
        const res_data = await ParticipantAccount.updateMany(filter, body)
            res.json(res_data)
        } catch (err) {
            throw err;
        }
    },
    async deleteParticipantAccountById(req, res){
        const id = req.params.id;
        try {
            
        const head = await ParticipantAccount.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (head === null)return res.status(400).json({ message: "No Account with this id" });
        
         res.json(head)
        } catch (err) {
            throw err;
        }
    }
}
