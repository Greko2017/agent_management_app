const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
    name: {
        type: String,
        require: true
    },    
    reward: {
        type: Object,
        require: true
    },
    start_period: {
        type: Date,
        require: true
    },
    end_period: {
        type: Date,
        require: true
    },
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = Campaign = mongoose.model("campaign", CampaignSchema);