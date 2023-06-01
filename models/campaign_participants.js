const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignParticipantSchema = new Schema({
    participants: {
        type: Array
    },
    name: {
        type: String,
        require: true
    },
    participant: {
        type: Object,
        require: true
    },
    account: {
        type: Object,
        require: true
    },
    reward: {
        type: Object,
        require: true
    },
    campaign: {
        type: Object,
        require: true
    },
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = CampaignParticipant = mongoose.model("campaign_participant", CampaignParticipantSchema);