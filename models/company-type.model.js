const mongoose = require('mongoose');

const CompanyTypeSchema = mongoose.Schema({
    company_type_name: String,
    company_type_description: String,
    company_type_user_id: String,
    company_type_status: Boolean,
    company_type_status_string: String
}, {
    timestamps: true
});

module.exports = mongoose.model('CompanyType', CompanyTypeSchema);