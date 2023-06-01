
const config = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generatePassword, sendCredentialEmail } = require("../utils/generalUtils");
const { Types } = require("mongoose");
const RoleModel = require("../models/RoleModel");
const UserModel = require('../models/user');
module.exports = {
    async updatePassword(req, res){
        const {email} = req.body
        try {
            const password = generatePassword()
            const hashedPassword = await bcrypt.hash(password, 12);
            const result = await UserModel.findOneAndUpdate({ email },{ $set: {password: hashedPassword} });
            console.log('result', result)
            await sendCredentialEmail(`Hi ! we just reset your password.\n<br/>Your Email : ${email} \n<br/>Your Password : ${ password}`, email)
            return res.status(201).json({ message: `password sent to ${email}` });
        } catch (error) {
            throw error;
        }
    },
    async getHeads(req, res) {
        try {
            
        const heads = await User.find({ is_lead:true })
            res.json(heads)
        } catch (err) {
            throw err;
        }
    },
    async addHead(req, res) {
        const { email, first_name, role_id } = req.body;
        try {
        let role = await RoleModel.find({'name': 'elite'});
        console.log('--- addHead role', role)
        const password = generatePassword()
        const newHead = new User({
            ...req.body,
            is_lead: true,
            role: role[0],
            role_id: role[0]?._id,
        })
        // Check if user already exist
        const head = await User.findOne({ email })
        if (head) return res.status(400).json({ message: "Email already registered. Please Login" });

    
        // Generate Password Hash
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw err;
                // Add hashed password to new user object
                newHead.password = hash;
                //Save user to DB
                const head = await newHead.save();
                // create json web token and send it back to client side
                await sendCredentialEmail(`Hi ${first_name} !\n<br/>Your Email: ${email} \n<br/>Your Email: ${ password}`, email)
                jwt.sign({ userId: head.id }, config.jwtSecret, { expiresIn: 60 * 60 }, (err, token) => {
                    if (err) throw err;
                    // response happen here
                    
                    res.json({
                        ...req.body,
                        is_lead: true,
                        token,
                        email,
                        password,
                    })
                })

            })
        });

        } catch (err) {
            throw err;
        }

    },
    async getHeadById(req, res){
        const id = req.params.id;
        if (!id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const head = await User.findOne({ is_lead:true, _id: Types.ObjectId(id)  })
            res.json(head)
        } catch (err) {
            throw err;
        }
    },
    async editHeadById(req, res){
        const { _id } = req.body;
        if (!_id) return res.status(403).json({ message: "Missing param" });

        try {
            
        const head = await User.findOneAndUpdate({ _id: Types.ObjectId(_id) },{
            ...req.body,
        })
        if (head === null)return res.status(400).json({ message: "No lead with this id" });
        
         res.json(head)
        } catch (err) {
            throw err;
        }
    },
    async deleteHeadById(req, res){
        const id = req.params.id;
        try {
            
        const head = await User.findOneAndDelete({ _id: Types.ObjectId(id) })
        if (head === null)return res.status(400).json({ message: "No lead with this id" });
        
         res.json(head)
        } catch (err) {
            throw err;
        }
    }
};

