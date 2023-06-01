
const config = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { Types } = require("mongoose");
const { generatePassword, sendCredentialEmail } = require("../utils/generalUtils");
const RoleModel = require("../models/RoleModel");

module.exports = {
    async addCollaborator(req, res) {
        const {email, first_name } = req.body
        console.log('email, first_name', email, first_name)
        try {
        const password = generatePassword()
        // Check user enters all fields
        if (!email || !password) return res.status(400).json({ message: "Please provide email and password" });
        // Check the user enters the right formatted email
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) === false) return res.status(400).json({ message: "Incorrect email format" });
        // Check user password length is more than 8 characters
        if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters long" });
        
        let role = await RoleModel.find({'name': 'collaborator'})[0];

        const newCollaborator = await new User({
            ...req.body,
            is_collaborator: true,
            is_staff: false,
            role,
            role_id: role?._id,
        })

        // Check if user already exist
        const collaborator = await User.findOne({ email })
        if (collaborator) return res.status(400).json({ message: "Email already registered. Please Login" });
                
        // Generate Password Hash
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw err;
                // Add hashed password to new user object
                newCollaborator.password = hash;
                //Save user to DB
                const user = await newCollaborator.save();
                // create json web token and send it back to client side
                await sendCredentialEmail(`Hi ${first_name} !\n<br/>Your Email : ${email} \n<br/>Your Password : ${ password}`, email)
                res.json({
                    ...user, password
                })  

            })
        });

        } catch (err) {
            throw err;
        }

    },
    async getCollaboratorsByParentId(req, res) {
        const parent_id = req.params.parent_id;
        try {
            
        const collaborators = await User.find({ is_collaborator:true, parent_id:parent_id })
            res.json(collaborators)
        } catch (err) {
            throw err;
        }
    },
    async getCollaborators(req, res) {
        try {
            
        const collaborators = await User.find({ is_collaborator:true })
            res.json(collaborators)
        } catch (err) {
            throw err;
        }
    },
    async getCollaboratorById(req, res) {
        const id = req.params.id;
        try {
            
        const collaborator = await User.findOne({ _id: Types.ObjectId(id||'')})
            res.json(collaborator)
        } catch (err) {
            throw err;
        }
    },

}


