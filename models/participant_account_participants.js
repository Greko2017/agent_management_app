const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipantSchemaAccountParticipantSchemas = new Schema({
    name: {
        type: String,
        require: true
    },
    account_id: String,
    participant_id: String,
    participant: {
        type: Object,
        require: true
    },
    
    participant_account: {
        type: Object,
        require: true
    },
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = ParticipantAccountParticipants = mongoose.model("participant_account_participants", ParticipantSchemaAccountParticipantSchemas);