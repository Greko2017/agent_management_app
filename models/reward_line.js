const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RewardLineSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    parent: {
        type: Object,
        require: true
    },
    ranking_order: {
        type: Number,
        require: true
    },
    beneficiary_target: {
        type: Number,
        require: true
    },
    reward_type: {
        type: String,
        default: 'common',
        require: true
    },
    reward_amount: {
        type: Number,
        require: true
    },
    reward_status: {
        type: String,
        default: 'on_going',
        require: true
    },
    account_type: {type:String, default: 'common'}, // elite_account, collaborator
    is_elite: {type:Boolean, default:false},
    is_collaborator: {type:Boolean, default:false},
    account: Object, // from all account the participant is registerd to
    
    reward_percentage_of_amount: {
        type: Number,
        require: true
    }, // percentage of the total reward amount
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = RewardLine = mongoose.model("reward_line", RewardLineSchema);