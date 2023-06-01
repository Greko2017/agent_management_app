const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CenterSchema = new Schema({
    country: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
    },
    created_by: {type:Object},modified_by: {type:Object},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = Center = mongoose.model("center", CenterSchema);