const mongoose = require('mongoose');

const CompanyUserSchema = mongoose.Schema({
    comp_user_id: String,
    comp_user_role: String,
    comp_user_company: String,
    comp_user_branch: [],
    comp_user_status: Boolean,
    comp_user_status_string: String
}, {
    timestamps: true
});

module.exports = mongoose.model('CompanyUser', CompanyUserSchema);