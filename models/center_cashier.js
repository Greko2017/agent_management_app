const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CashierCenterSchema = new Schema({
    name: {
        type: Object
    },
    cashier: {
        type: Object
    },
    cashier_id: {
        type: String,
        require: true
    },
    center: {
        type: Object,
        require: true
    },
    center_id: {
        type: String,
    },
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = CashierCenter = mongoose.model("cashier_center", CashierCenterSchema);