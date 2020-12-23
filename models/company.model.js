const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    comp_name: String,
    comp_address: {
        address_line1: String,
        address_line2: String,
        country: String,
        district: String,
        city: String,
        zip_code: String
    },
    comp_mobile: String,
    comp_landline: String,
    comp_website: String,
    comp_email: String,
    comp_logo: String,
    comp_location: String,
    comp_status: Boolean,
    comp_status_string: String,
    comp_settings: {},
    comp_category: String,
    comp_users: [],
    comp_owner: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', CompanySchema);