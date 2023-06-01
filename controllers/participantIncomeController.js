
const ParticipantIncome = require("../models/participant_income");
const { Types } = require("mongoose");

module.exports = {
    async getParticipantIncomes(req, res) {
        try {
            
        const participant_incomes = await ParticipantIncome.find()
        res.json(participant_incomes)
        } catch (err) {
            throw err;
        }
    },
    async addParticipantIncome(req, res) {
        const { name } = req.body;
        try {
        const newParticipantIncome = new ParticipantIncome({
            ...req.body,
        })
        const test_participant_income = await ParticipantIncome.findOne({ name })
        if (test_participant_income) return res.status(400).json({ message: "ParticipantIncome already registered." });

        const participant_income = await newParticipantIncome.save();
        res.json({
            ...participant_income,
        })

        } catch (err) {
            throw err;
        }

    },
    async getParticipantIncomeById(req, res){
        const id = req.params.id;
        if (!id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const participant_income = await ParticipantIncome.findOne({ _id: Types.ObjectId(id)  })
            res.json(participant_income)
        } catch (err) {
            throw err;
        }
    },
    async editParticipantIncomeById(req, res){
        const { _id } = req.body;
        if (!_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const participant_income = await ParticipantIncome.findOneAndUpdate({ _id: Types.ObjectId(_id) },{
            ...req.body,
        })
        if (participant_income === null)return res.status(400).json({ message: "No participant_income with this id" });
        
         res.json(participant_income)
        } catch (err) {
            throw err;
        }
    },
    async deleteParticipantIncomeById(req, res){
        const id = req.params.id;
        try {
            
        const participant_income = await ParticipantIncome.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (participant_income === null)return res.status(400).json({ message: "No participant_income with this id" });
        
         res.json(participant_income)
        } catch (err) {
            throw err;
        }
    }
};

