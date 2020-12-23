const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Login = require('../models/login.model');
const User = require('../models/user.model');
const Company = require('../models/company.model.js');

// Get My Profile
exports.getMyProfile = (req, res) => {
    User.findOne({ _id: req.user.user_profile_id })
        .then((user) => {

            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
            res.send(user);

        })
        .catch((err) => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.user.user_profile_id
                });                
            }
            return res.status(500).send({
                message: "Error geting User with id " + req.user.user_profile_id
            });
        });
};

// Get Login object
exports.getLoginData = (req, res) => {
    Login.findOne({ user_profile_id: req.query.user_id })
        .then((user) => {
            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
            user.login_password = "";
            user.login_salt = "";
            res.send(user);

        })
        .catch((err) => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.query.user_id
                });                
            }
            return res.status(500).send({
                message: "Error geting User with id " + req.query.user_id
            });
        });
};

// Get an User Profile
exports.getUser = (req, res) => {
    User.findOne({ _id: req.query.user_id })
        .then((user) => {

            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
            res.send(user);

        })
        .catch((err) => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.query.user_id
                });                
            }
            return res.status(500).send({
                message: "Error geting User with id " + req.query.user_id
            });
        });
};

// Get My Permission
exports.getMyPermission = (req, res) => {
    Company.findOne({ _id: req.header('comp_id') })
        .then((company) => {

            if (!company) {
                res.status(401).json({ success: false, msg: "could not find company" });
            } else {
                company['comp_users'].map(permition => {
                    if (permition['id'] === req.query.user_id ) {
                        res.send(permition);
                    }
                });
            }
        })
        .catch((err) => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "not found with id " + req.query.user_id
                });                
            }
            return res.status(500).send({
                message: "Error geting with id " + req.query.user_id
            });
        });
};

// Update User Profile
exports.updateProfile = (req, res) => {

    // Validate Request
    if(!req.body._id) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find note and update it with the request body
    User.findByIdAndUpdate(req.body._id, {
        user_first_name: req.body.user_first_name,
        user_last_name: req.body.user_last_name,
        user_image: req.body.user_image,
        user_address: req.body.user_address,
        user_reference_id: req.body.user_reference_id,
        user_reference: req.body.user_reference,
        user_status_string: req.body.user_status_string,
        user_status: req.body.user_status
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.query.req.body._id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.query.req.body._id
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.query.req.body._id
        });
    });
};

// Update User password
exports.updatePassword = (req, res) => {
    Login.findOne({ login_email: req.body.email })
        .then((login) => { 
            let isValid = false;
            if(login){
                isValid = utils.validPassword(req.body.password_old, login.login_password, login.login_salt);
            }
            if(login && isValid) {
                // Validate Request
                if(!req.body.password_new) {
                    return res.status(400).send({
                        message: "password_new can not be empty"
                    });
                }
                const saltHash = utils.genPassword(req.body.password_new);
                const salt = saltHash.salt;
                const password = saltHash.hash;
                // Find note and update it with the request body
                Login.findByIdAndUpdate(req.user._id, {
                    login_password: password,
                    login_salt: salt
                }, {new: true})
                .then(login => {
                    if(!login) {
                        return res.status(404).send({
                            message: "User not found with id " + req.query.req.body._id
                        });
                    }
                    res.send(login);
                }).catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "User not found with id " + req.query.req.body._id
                        });                
                    }
                    return res.status(500).send({
                        message: "Error updating User with id " + req.query.req.body._id
                    });
                });
            } else {
                if(login) {
                    res.json({ success: false, exist: true });
                } else {
                    res.json({ success: false, exist: false });
                }
                
            }
        })
        .catch((err) => {
            console.log(err)
        });
};
