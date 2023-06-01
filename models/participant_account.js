const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipantAccountSchema = new Schema({
    participants: {
        type: Array
    },
    approver: {
        type: Object,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: 'draft'
    },
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = ParticipantAccount = mongoose.model("participant_account", ParticipantAccountSchema);