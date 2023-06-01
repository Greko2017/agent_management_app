const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipantIncomeSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    beneficiary_instalment_history: {
        type: Object,
        require: true
    },
    amount: {
        type: Number,
    },
    status: {type:String, require: true, default:'available'},
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = ParticipantIncome = mongoose.model("participant_income", ParticipantIncomeSchema);