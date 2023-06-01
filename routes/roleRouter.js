const express = require("express");
const {getRoles, createRole, updateRole, deleteRole, getRoleById}  = require("../controllers/roleController");

const roleRouter = express.Router();

roleRouter.get('/list', getRoles);
roleRouter.get('/:role_id', getRoleById);
roleRouter.post('/', createRole);
roleRouter.patch('/', updateRole);     
roleRouter.delete('/:id', deleteRole);

module.exports = roleRouter;