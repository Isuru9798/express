const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    login_email: String,
    login_email_verification: Boolean,
    login_mobile: String,
    login_mobile_verification: Boolean,
    login_password: String,
    login_salt: String,
    login_type: String,
    login_role: String,
    login_status: Boolean,
    login_status_string: String,
    login_companies: [String],
    
    user_profile_id: String,
    

});

module.exports = mongoose.model('Login', LoginSchema);