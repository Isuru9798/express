const passport = require('passport');
const router = require('express').Router();
const userProfile = require('../controllers/user-profile.controller');

    // Retrieve my profile
    router.get('/me', passport.authenticate('jwt', { session: false }), userProfile.getMyProfile);

    // Retrieve my profile
    router.get('/loginData', passport.authenticate('jwt', { session: false }), userProfile.getMyProfile);

    // Retrieve an profile
    router.get('/user', passport.authenticate('jwt', { session: false }), userProfile.getUser);

    // Retrieve an profiles
    router.get('/myPermissions', passport.authenticate('jwt', { session: false }), userProfile.getMyPermission);

    // Update a Userprofile
    router.put('/user', passport.authenticate('jwt', { session: false }), userProfile.updateProfile); 

    // Update a password
    router.put('/password', passport.authenticate('jwt', { session: false }), userProfile.updatePassword);

module.exports = router;