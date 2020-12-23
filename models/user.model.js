const mongoose = require('mongoose');
const Address = require('./address.model');

const UserSchema = new mongoose.Schema({
    user_first_name: String,
    user_last_name: String,
    user_image: String,
    user_address: Address,
    user_reference_id: String,
    user_reference: Boolean,
    user_status_string: String,
    user_status: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);