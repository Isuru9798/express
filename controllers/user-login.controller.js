const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Login = require('../models/login.model');
const User = require('../models/user.model');
const utils = require('../lib/utils');


// Register a new user 
exports.localSignup = (req, res) => {
    Login.findOne({ $or:[ { login_email: req.body.login.login_email }, { login_mobile: req.body.login.login_mobile } ]})
    .then((login) => {
        if(login === null) {
            const newuser = new User({
                user_first_name: req.body.user.user_first_name,
                user_last_name: req.body.user.user_last_name,
                user_image: req.body.user.user_image,
                user_address: req.body.user.user_address,
                user_reference_id: req.body.user.user_reference_id,
                user_reference: req.body.user.user_reference,
                user_status_string: req.body.user.user_status_string,
                user_status: req.body.user.user_status
            });
            try {
                newuser.save()
                    .then((user) => {
                        const saltHash = utils.genPassword(req.body.login.login_password);
                        const salt = saltHash.salt;
                        const password = saltHash.hash;
                        const newLogin = new Login({
                            login_email: req.body.login.login_email,
                            login_email_verification: false, // set false by backend
                            login_mobile: req.body.login.login_mobile,
                            login_mobile_verification: false, // set false by backend
                            login_password: password,
                            login_salt: salt,
                            login_type: req.body.login.login_type,
                            login_role: req.body.login.login_role,
                            login_status: false, // set false by backend
                            login_status_string: req.body.login.login_status_string,
                            login_companies: req.body.login.login_companies,
                            user_profile_id: user._id,
                        });
                    
                        try {
                            newLogin.save()
                                .then((login) => {
                                    res.json({ success: true, login: login });
                                });
                        } catch (err) {
                            res.json({ success: false, msg: err });
                        }
                    });
        
            } catch (err) {
                res.json({ success: false, msg: err });
            }
        } else {
            res.json({ success: false, exist: true });
        }
    })
    .catch((err) => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with " + req.body.login.login_email
            });                
        }
        return res.status(500).send({
            message: "Error geting User with" + req.body.login.login_email
        });
    });
};

// Validate an existing user and issue a JWT
exports.localSignin = (req, res) => {

    Login.findOne({ $or:[ { login_email: req.body.login_user_name }, { login_mobile: req.body.login_user_name } ]})
        .then((login) => {

            if (!login) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.login_password, login.login_password, login.login_salt);
            if (isValid) {

                const tokenObject = utils.issueJWT(login);

                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, login: login});

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with " + req.body.login_user_name
                });                
            }
            return res.status(500).send({
                message: "Error geting User with" + req.body.login_user_name
            });
        });
};

// Validate an existing user and issue a JWT
exports.SystemAdminSignin = (req, res) => {

    Login.findOne({ login_email: req.body.login_email })
        .then((login) => {

            if (!login) {
                res.status(401).json({ success: false, msg: "could not find user" });
            } 
            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.login_password, login.login_password, login.login_salt);
            if (isValid) {

                const tokenObject = utils.issueJWT(login);

                if (login.login_type != "system" && login.login_role != "admin") {
                    res.status(401).json({ success: false, msg: "Do not have needed permissions" });
                }
                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, login: login});

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with " + req.body.login_email
                });                
            }
            return res.status(500).send({
                message: "Error geting User with" + req.body.login_email
            });
        });
};

// Add company to user
exports.addUserToCompany = (req, res) => {

    Login.findOne({ user_profile_id: req.body.user_id })
        .then((login) => {

            if (!login) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
            // Add company to login
            login.login_companies.push(req.body.companyId);
            Login.findByIdAndUpdate(login._id, login, {new: true})
            .then(loginData => {
                if(!loginData) {
                    return res.status(404).send({
                        message: "Error in updating login data"
                    });
                }
                res.send(loginData);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Not found with id error"
                    });                
                }
                return res.status(500).send({
                    message: "Error updating login data"
                });
            });

        })
        .catch((err) => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with " + req.body.user_id
                });                
            }
            return res.status(500).send({
                message: "Error geting User with" + req.body.user_id
            });
        });
};
