const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RewardSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    campaign: {
        type: Object,
        require: true
    },
    reward_amount: {
        type: Number,
        require: true
    },
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = Reward = mongoose.model("reward", RewardSchema);