const RoleModel = require("../models/RoleModel");
const PermissionModel = require("../models/PermissionModel");
// const {Type} = require("mongoose");

module.exports = {
async getRoles (req, res) {
    try {
        const roles = await RoleModel.find()
        // console.log('roles', roles)
        res.status(200).json(roles);
    } catch (error) {
        res.status(404).json({message: error.message});        
    }
},
async getRoleById (req, res) {
    let role_id = req.params.role_id
    try {
        const role = await RoleModel.findById(role_id)
        // console.log('role', role)
        res.status(200).json(role);
    } catch (error) {
        res.status(404).json({message: error.message});        
    }
},
async createRole(req, res) {
    const role = req.body;
    // let obj = {
    //     _id: '62822d6fa41e0c5668830c76',
    // }
    // console.log('-- createUsersCrud role', role)
            
    const newRole = await new RoleModel(role);
    let final_result = new Object
    try {
        const resNewRole = await newRole.save(async function(err, obj) {
            // console.log('obj', obj)
            if (err){
                return res.send(err);
            }
            const documents = [{
                module_name:  'beneficiaries',
                has_create: false,
                role_id: obj._id,
                role: obj,
                has_read: false,
                has_update: false,
                has_delete: false,
             }, {
                module_name:  'collaborators',
                has_create: false,
                role_id: obj._id,
                role: obj,
                has_read: false,
                has_update: false,
                has_delete: false,
             }, {
                module_name:  'elites',
                has_create: false,
                role_id: obj._id,
                role: obj,
                has_read: false,
                has_update: false,
                has_delete: false,
             }, {
                module_name:  'rewards',
                has_create: false,
                role_id: obj._id,
                role: obj,
                has_read: false,
                has_update: false,
                has_delete: false,
             },{
                module_name:  'campaigns',
                has_create: false,
                role_id: obj._id,
                role: obj,
                has_read: false,
                has_update: false,
                has_delete: false,
             },{
                module_name:  'user_roles',
                has_create: false,
                role_id: obj._id,
                role: obj,
                has_read: false,
                has_update: false,
                has_delete: false,
             },{
                module_name:  'installments',
                has_create: false,
                role_id: obj._id,
                role: obj,
                has_read: false,
                has_update: false,
                has_delete: false,
             },{
                module_name:  'generals',
                has_create: false,
                role_id: obj._id,
                role: obj,
                has_read: false,
                has_update: false,
                has_delete: false,
             },{
                module_name:  'installments',
                has_create: false,
                role_id: obj._id,
                role: obj,
                has_read: false,
                has_update: false,
                has_delete: false,
             },{
                module_name:  'participant_accounts',
                has_create: false,
                role_id: obj._id,
                role: obj,
                has_read: false,
                has_update: false,
                has_delete: false,
             },{
                module_name:  'stakeholder_account_histories',
                has_create: false,
                role_id: obj._id,
                role: obj,
                has_read: false,
                has_update: false,
                has_delete: false,
             },{
                module_name:  'centers',
                has_create: false,
                role_id: obj._id,
                role: obj,
                has_read: false,
                has_update: false,
                has_delete: false,
             }
            ];

            // Check for duplicate module names
            const uniqueNames = documents.filter((document) => document.module_name !== null);

            // Insert the documents
            await PermissionModel.insertMany(uniqueNames, {unique: false,  });

                 final_result = await obj
                //  console.log('-- final_result', final_result)
                 return res.status(201).json(final_result);
        });
        // console.log('-- resNewRole', resNewRole)
    } catch (error) {
        // console.log('error', error)
        return res.status(409).json({message: error.message});        
    }
},
async updateRole(req, res){
    const role = req.body;
    // console.log('req.body', req.body)
    let id = role._id;
    try {
        
        let result = await RoleModel.findById(id)
        // console.log('result', result)
        if (!result) {
        return res.status(404).send({message: "data is not found"});
        }
        else {
            // console.log('role', role)
            let _res = await RoleModel.findOneAndUpdate({_id: result._id}, role);
            return res.status(203).json({..._res._doc, ...role, updated_at: new Date()});
        }
    } catch (error) {
        return res.status(501).send(error);
    }
},
async deleteRole (req, res) {
    // console.log('In deleteRole',req.params)
    let id = req.params.id;
    try {
        
        let result = await RoleModel.findById(id)
        // console.log('result', result)
        if (!result) {
        return res.status(404).send({message: "role is not found"});
        }
        else {
            console.log('In delete role')
            await RoleModel.deleteOne({_id: result._id});
            return res.status(203).send(("role deleted"));
        }
    } catch (error) {
        return res.status(501).send(error);
    }
},
}





