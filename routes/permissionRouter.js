const express = require("express");
const {getPermissions, createPermission,getPermissionsById, updatePermission, deletePermission, getPermissionsByRoleId}  = require('../controllers/permissionController');

const permissionRouter = express.Router();
permissionRouter.get('/list/:role_id', getPermissionsByRoleId);
permissionRouter.get('/list', getPermissions);
permissionRouter.get('/:id', getPermissionsById);     
permissionRouter.post('/', createPermission);
permissionRouter.patch('/', updatePermission);     
permissionRouter.delete('/:id', deletePermission);

module.exports = permissionRouter;