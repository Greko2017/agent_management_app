
const User = require("../models/user");
const { Types } = require("mongoose");

module.exports = {
    
    async getCenters(req, res) {
        try {
            
        const beneficiaries = await User.find({is_beneficiary: true})
        res.json(beneficiaries)
        } catch (err) {
            throw err;
        }
    },
    async addBeneficiary(req, res) {
        const {email} = req.body
        try {
        const newBeneficiary = await new User({
            ...req.body,
            is_beneficiary: true,
        })

        // Check if user already exist
        if (email === " ") {

        } else {            
            const beneficiary = await User.findOne({ email })
            if (beneficiary) return res.status(400).json({ message: "Email already registered. Please Login" });            
        }
        const _beneficiary = await newBeneficiary.save()
        res.json({
            ..._beneficiary,
        })

        } catch (err) {
            throw err;
        }

    },
    async getBeneficiariesByParentId(req, res) {
        const parent_id = req.params.parent_id;
        try {
            
        const beneficiaries = await User.find({ is_beneficiary:true, parent_id:parent_id })
            res.json(beneficiaries)
        } catch (err) {
            throw err;
        }
    },
    async getBeneficiaries(req, res) {
        try {
            
        const beneficiaries = await User.find({ is_beneficiary:true })
            res.json(beneficiaries)
        } catch (err) {
            throw err;
        }
    },
    async getBeneficiaryById(req, res) {
        const id = req.params.id;
        try {
            
        const beneficiary = await User.findOne({ _id: Types.ObjectId(id||'')})
            res.json(beneficiary)
        } catch (err) {
            throw err;
        }
    },
    async deleteBeneficiaryById(req, res){
        const id = req.params.id;
        try {
            
        const center = await User.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (center === null)return res.status(400).json({ message: "No Beneficiary with this id" });
        
         res.json(center)
        } catch (err) {
            throw err;
        }
    },
    async editBeneficiaryById(req, res){
        const { _id } = req.body;
        if (!_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const center = await User.findOneAndUpdate({ is_beneficiary:true, _id: Types.ObjectId(_id) },{
            ...req.body,
        })
        if (center === null)return res.status(400).json({ message: "No Beneficiary with this id" });
        
         res.json(center)
        } catch (err) {
            throw err;
        }
    },
    

}