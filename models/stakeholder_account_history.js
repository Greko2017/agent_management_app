const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StakeHolderAccountHistorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    participant_account_participant: {
        type: Array,
        require: true
    },
    is_credit: {
        type: Boolean,
        require: true
    },
    is_debit: {
        type: Boolean,
        require: true
    },
    amount: {
        type: Number,
    },
    status: {
        type: Number,
    },
    approver: {
        type: Object,
    },
    motif: String,
    created_by: {type:Object},modified_by: {type:Object},
    status: {
        type: String,
        default: 'to_approve',
        require: true
    },
    account_id: String,
    participant_account: Object,
    approved_by: {type:Object},
    note: String,
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = StakeHolderAccountHistory = mongoose.model("stakeholder_account_history", StakeHolderAccountHistorySchema);