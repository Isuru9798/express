const mongoose = require('mongoose');

const UomSchema = mongoose.Schema({
    uom_code: String,
    uom_company: String,
    uom_status: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Uom', UomSchema);