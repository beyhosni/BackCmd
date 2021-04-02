const db = require("../models");
const Cmde = db.cmd;
// Create and Save a new cmd
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a cmd
    const cmd = new Cmde({
        title: req.body.title,
        description: req.body.description,
        isReady: req.body.isReady ? req.body.isReady : false,
        location:req.body.location
    });

    // Save cmd in the database
    cmd
        .save(cmd)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred."
            });
        });
};

// Retrieve all Commandes from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Cmde.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving commandes."
            });
        });
};

// Find a single Commande with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cmde.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Commande with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Commande with id=" + id });
        });
};

// Update a Commande by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Cmde.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update commande `
                });
            } else res.send({ message: "Commande was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating commande with id=" + id
            });
        });
};

// Delete a Commande with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Cmde.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete commande`
                });
            } else {
                res.send({
                    message: "Commande was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Commande with id=" + id
            });
        });
};

// Delete all Commande from the database.
exports.deleteAll = (req, res) => {
    Cmde.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} commande were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all commandes."
            });
        });
};

// Find all published Commandes
exports.findAllPublished = (req, res) => {
    Cmde.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Commandes."
            });
        });
};
