const Type = require('../models/type.model.js');

// Create and Save a new Type
exports.create = (req, res) => {
    console.log(req.body);
    // Validate request
    if(!req.body.type_code) {
        return res.status(400).send({
            message: "type_code can not be empty"
        });
    }

    // Create a Type
    const type = new Type({
        type_code: req.body.type_code,
        type_status: req.body.type_status,
        type_company: req.body.type_company,
    });

    // Save Product in the database
    type.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Type."
        });
    });
};

// Retrieve and return all types from the database.
exports.findAll = (req, res) => {
    Type.find({ 'type_company': req.header('comp_id') })
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving types."
        });
    });
};

// Find a single type with a type_id
exports.findOne = (req, res) => {
    Type.findById(req.query.type_id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "type not found with id " + req.query.type_id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "type not found with id " + req.query.type_id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving type with id " + req.query.type_id
        });
    });
};

// Update a type identified by the type_id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.type_code) {
        return res.status(400).send({
            message: "Type content can not be empty"
        });
    }

    // Find note and update it with the request body
    Type.findByIdAndUpdate(req.query.type_id, {
        type_code: req.body.type_code,
        type_status: req.body.type_status,
        type_company: req.body.type_company,
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Type not found with id " + req.query.type_id
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Type not found with id " + req.query.type_id
            });                
        }
        return res.status(500).send({
            message: "Error updating Type with id " + req.query.type_id
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Type.findByIdAndRemove(req.query.type_id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Type not found with id " + req.query.type_id
            });
        }
        res.send({message: "Type deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Type not found with id " + req.query.type_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Type with id " + req.query.type_id
        });
    });
};
