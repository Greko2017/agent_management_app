const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
    name: String,
    permissions: Array,
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

var RoleModel = mongoose.model('Roles', roleSchema);
module.exports = RoleModel;

// https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas