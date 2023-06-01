const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstalmentSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    total_amount: {
        type: Number,
        require: true
    },
    number_of_payment_instalment: {
        type: Number,
    },
    instalment_lines: {
        type: Array,
    },
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = Instalment = mongoose.model("instalment", InstalmentSchema);