const Instalment = require("../models/instalment");
const { Types } = require("mongoose");

module.exports = {
    async getInstallments(req, res) {
        try {
            
        const installments = await Instalment.find()
        res.json(installments)
        } catch (err) {
            throw err;
        }
    },
    async addInstalment(req, res) {
        const { name } = req.body;
        try {
        const newInstalment = new Instalment({
            ...req.body,
        })
        // Check if user already exist
        const test_instalment = await Instalment.findOne({ name })
        if (test_instalment) return res.status(400).json({ message: "Instalment already registered." });

        const instalment = await newInstalment.save();
        res.json({
            ...instalment,
        })

        } catch (err) {
            throw err;
        }

    },
    async getInstalmentById(req, res){
        const id = req.params.id;
        if (!id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const instalment = await Instalment.findOne({ _id: Types.ObjectId(id)  })
            res.json(instalment)
        } catch (err) {
            throw err;
        }
    },
    async editInstalmentById(req, res){
        const { _id } = req.body;
        if (!_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const instalment = await Instalment.findOneAndUpdate({ _id: Types.ObjectId(_id) },{
            ...req.body,
        })
        if (instalment === null)return res.status(400).json({ message: "No lead with this id" });
        
         res.json(instalment)
        } catch (err) {
            throw err;
        }
    },
    async deleteInstalmentById(req, res){
        const id = req.params.id;
        try {
            
        const instalment = await Instalment.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (instalment === null)return res.status(400).json({ message: "No lead with this id" });
        
         res.json(instalment)
        } catch (err) {
            throw err;
        }
    }
};

