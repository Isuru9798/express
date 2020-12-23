const passport = require('passport');
const router = require('express').Router();
const userlogin = require('../controllers/user-login.controller');

    // User register
    router.post('/register', userlogin.localSignup);

    // User login
    router.post('/login', userlogin.localSignin);

    // Super admin login
    router.post('/superadminlogin', userlogin.SystemAdminSignin);

    // Retrieve an profiles
    router.post('/addCompanyUser', passport.authenticate('jwt', { session: false }), userlogin.addUserToCompany);

module.exports = router;