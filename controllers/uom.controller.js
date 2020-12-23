const Uom = require('../models/uom.model.js');

// Create and Save a new Uom
exports.create = (req, res) => {
    console.log(req.body);
    // Validate request
    if(!req.body.uom_code) {
        return res.status(400).send({
            message: "uom_code can not be empty"
        });
    }

    // Create a Uom
    const uom = new Uom({
        uom_code: req.body.uom_code,
        uom_status: req.body.uom_status,
        uom_company: req.body.uom_company,
    });

    // Save Product in the database
    uom.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Uom."
        });
    });
};

// Retrieve and return all uoms from the database.
exports.findAll = (req, res) => {
    Uom.find({ 'uom_company': req.header('comp_id') })
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving uoms."
        });
    });
};

// Find a single uom with a uom_id
exports.findOne = (req, res) => {
    Uom.findById(req.query.uom_id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "uom not found with id " + req.query.uom_id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "uom not found with id " + req.query.uom_id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving uom with id " + req.query.uom_id
        });
    });
};

// Update a uom identified by the uom_id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.uom_code) {
        return res.status(400).send({
            message: "Uom content can not be empty"
        });
    }

    // Find note and update it with the request body
    Uom.findByIdAndUpdate(req.query.uom_id, {
        uom_code: req.body.uom_code,
        uom_status: req.body.uom_status,
        uom_company: req.body.uom_company,
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Uom not found with id " + req.query.uom_id
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Uom not found with id " + req.query.uom_id
            });                
        }
        return res.status(500).send({
            message: "Error updating Uom with id " + req.query.uom_id
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Uom.findByIdAndRemove(req.query.uom_id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Uom not found with id " + req.query.uom_id
            });
        }
        res.send({message: "Uom deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Uom not found with id " + req.query.uom_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Uom with id " + req.query.uom_id
        });
    });
};
