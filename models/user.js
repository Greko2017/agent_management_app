const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    gender: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    id_card: {
        type: String,
    },
    date_of_birth: {
        type: String,
    },
    remarks: {
        type: String,
    },
    email: {
        type: String,
    },
    is_staff: {
        type: Boolean,
        default: false
    },
    is_lead: {
        type: Boolean,
        default: false
    },
    is_collaborator: {
        type: Boolean,
        default: false
    },
    is_beneficiary: {
        type: Boolean,
        default: false
    },
    parent_id: {
        type: String,
    },
    parent: {
        type: Object,
    },
    instalment: {
        type: Object,
    },
    center: {
        type: Object,
    },
    role_id: String,
    role: Object,
    
    parents_common_account_id: String,
    parents_common_account: Object,
    collaborator_elite_account_id: String,
    collaborator_elite_account: Object,
    parent_collaborator_account_id: String,
    parent_collaborator_account: Object,


    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = User = mongoose.model("user", UserSchema);