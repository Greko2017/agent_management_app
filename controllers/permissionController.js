const PermissionModel = require("../models/PermissionModel");

module.exports = {
async getPermissions (req, res){
    try {
        const permissions = await PermissionModel.find()
        // console.log('permissions', permissions)
        res.status(200).json(permissions);
    } catch (error) {
        res.status(404).json({message: error.message});        
    }
},
async getPermissionsById(req, res){
    const id = req.params.id
    // console.log('In getPermissionsByRoleId : id', id)
    try {
        const permission = await PermissionModel.findById(id)
        // console.log('permission', permission)
        res.status(200).json(permission);
    } catch (error) {
        res.status(404).json({message: error.message});        
    }
}, 
async getPermissionsByRoleId (req, res){
    const role_id = req.params.role_id
    // console.log('In getPermissionsByRoleId : role_id', role_id)
    try {
        const permissions = await PermissionModel.find({role_id: role_id})
        // console.log('permissions', permissions)
        res.status(200).json(permissions);
    } catch (error) {
        res.status(404).json({message: error.message});        
    }
},
async createPermission(req, res){
    const permission = req.body;
    // console.log('-- createPermission permission', permission)
    
    const newPermission = new PermissionModel(permission);
    try {
        const resNewUser = await newPermission.save()
        // console.log('-- resNewUser', resNewUser)
        return res.status(201).json(resNewUser);
    } catch (error) {
        return res.status(409).json({message: error.message});        
    }
},
async updatePermission(req, res){
    const permission = req.body;
    // console.log('req.body', req.body)
    let id = permission._id;
    try {
        
        let result = await PermissionModel.findById(id)
        // console.log('result', result)
        if (!result) {
        return res.status(404).send("data not found");
        }
        else {
            // console.log('permission', permission)
            let _res = await PermissionModel.findOneAndUpdate({_id: result._id}, permission);
            return res.status(203).json({..._res._doc, ...permission, updated_at: new Date()});
        }
    } catch (error) {
        return res.status(501).send(error);
    }
},
async deletePermission (req, res){
    // console.log('In deletePermission',req.params)
    let id = req.params.id;
    try {
        
        let result = await PermissionModel.findById(id)
        // console.log('result', result)
        if (!result) {
        return res.status(404).send("permission is not found");
        }
        else {
            console.log('In delete permission')
            await PermissionModel.deleteOne({_id: result._id});
            return res.status(203).send(("permission deleted"));
        }
    } catch (error) {
        return res.status(501).send(error);
    }
},
}


