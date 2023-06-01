const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstalmentLineSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    parent: {
        type: Object,
        require: true
    },
    due_date: {
        type: Date,
        require: true
    },
    percentage_of_total_amount: {
        type: Number,
        require: true
    },
    is_first_instalment: {
        type: Boolean,
        require: true,
        default: false
    },
    reward: Object,
    amount: {
        type: Number,
        require: true
    },
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = InstalmentLine = mongoose.model("instalment_line", InstalmentLineSchema);