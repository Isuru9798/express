const mongoose = require('mongoose');

const TypeSchema = mongoose.Schema({
    type_code: String,
    type_company: String,
    type_status: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Type', TypeSchema);