const passport = require('passport');
const router = require('express').Router();
const type = require('../controllers/type.controller.js');

// Create a new Uom
router.post('/type', passport.authenticate('jwt', { session: false }), type.create);

// Retrieve all Uoms
router.get('/types', passport.authenticate('jwt', { session: false }), type.findAll);

// Retrieve a single Uom with uom_id
router.get('/type', passport.authenticate('jwt', { session: false }), type.findOne);

// Update a Uom with uom_id
router.put('/type', passport.authenticate('jwt', { session: false }), type.update);

// Delete a Uom with uom_id
router.delete('/type', passport.authenticate('jwt', { session: false }), type.delete);

module.exports = router;