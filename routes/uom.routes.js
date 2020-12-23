const passport = require('passport');
const router = require('express').Router(); 
const uom = require('../controllers/uom.controller.js');  

    // Create a new Uom
    router.post('/uom', passport.authenticate('jwt', { session: false }), uom.create);

    // Retrieve all Uoms
    router.get('/uoms', passport.authenticate('jwt', { session: false }), uom.findAll);

    // Retrieve a single Uom with uom_id
    router.get('/uom', passport.authenticate('jwt', { session: false }), uom.findOne);

    // Update a Uom with uom_id
    router.put('/uom', passport.authenticate('jwt', { session: false }), uom.update);

    // Delete a Uom with uom_id
    router.delete('/uom', passport.authenticate('jwt', { session: false }), uom.delete);

module.exports = router;