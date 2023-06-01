const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema({
    // name: { type: String, unique: true , required : true, dropDups: true , index: true},
    role_id: String,
    module_name: String,
    role: Object,
    has_create: {
      type: Boolean,
      default: false
    },
    has_read: {
      type: Boolean,
      default: false
    },
    has_update: {
      type: Boolean,
      default: false
    },
    has_delete: {
      type: Boolean,
      default: false
    },
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

var PermissionModel = mongoose.model('Permissions', permissionSchema);
module.exports = PermissionModel;

// https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas