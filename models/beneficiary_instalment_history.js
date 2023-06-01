const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BeneficiaryInstalmentHistorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    beneficiary: {
        type: Object,
        require: true
    },
    paid_date: {
        type: Date,
    },
    paid_instalment_line: {
        type: Object
    },
    amount_paid: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        default: 'draft',
    },
    payment_confirmed_by: Object,
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = BeneficiaryInstalmentHistoryModel = mongoose.model("beneficiary_instalment_history", BeneficiaryInstalmentHistorySchema);