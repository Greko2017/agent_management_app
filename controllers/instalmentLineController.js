const InstalmentLine = require("../models/Instalment_line");
const { Types } = require("mongoose");

module.exports = {
    async addInstalmentLine(req, res) {
        const {name, is_first_instalment} =req.body
        if ( is_first_instalment === true) {
            const instalment = await InstalmentLine.findOne({ is_first_instalment: true})
            if (instalment) return res.status(400).json({ message: "Can't have tow instalment line defined as 1st instalment." });
        }
        try {
        const newInstalmentLine = await new InstalmentLine({
            ...req.body,
        })

        // Check if user already exist
        const instalment = await InstalmentLine.findOne({ name })
        if (instalment) return res.status(400).json({ message: "Name already registered." });
        
        const _instalment = await newInstalmentLine.save()
        res.json({
            ..._instalment,
        })

        } catch (err) {
            throw err;
        }

    },
    async getInstalmentLines(req, res) {
        try {
            
        const instalment_lines = await InstalmentLine.find()
            res.json(instalment_lines)
        } catch (err) {
            throw err;
        }
    },
    async getInstalmentLinesByInstalmentId(req, res) {
        const parent_id = req.params.parent_id;
        try {
            
        const beneficiaries = await InstalmentLine.find({ 'parent._id':parent_id })
            res.json(beneficiaries)
        } catch (err) {
            throw err;
        }
    },
    async getInstalmentLineById(req, res) {
        const id = req.params.id;
        try {
            
        const instalment = await InstalmentLine.findOne({ _id: Types.ObjectId(id||'')})
            res.json(instalment)
        } catch (err) {
            throw err;
        }
    },
    async editInstalmentLineById(req, res){
        const { _id, is_first_instalment, parent} =req.body
        if (!_id) return res.status(403).json({ message: "Missing param" });

        if ( is_first_instalment === true) {
            const instalment_lines = await InstalmentLine.find({"parent._id": parent._id , is_first_instalment: true, _id:{$ne: Types.ObjectId(_id)}})
            // console.log('instalment_lines', instalment_lines)
            if (instalment_lines.length !== 0) return res.status(400).json({ message: "Can't have tow instalment line defined as 1st instalment." });
        }
        try {
            
        const instalment = await InstalmentLine.findOneAndUpdate({ _id: Types.ObjectId(_id) },{
            ...req.body,
        })
        if (instalment === null)return res.status(400).json({ message: "No lead with this id" });
        
         res.json(instalment)
        } catch (err) {
            throw err;
        }
    },
    async deleteInstalmentLineById(req, res){
        const id = req.params.id;
        try {
            
        const instalment = await InstalmentLine.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (instalment === null)return res.status(400).json({ message: "No lead with this id" });
        
         res.json(instalment)
        } catch (err) {
            throw err;
        }
    }

}