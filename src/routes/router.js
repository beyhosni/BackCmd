module.exports = app => {
    const cmd = require("../controllers/cmdController.js");

    var router = require("express").Router();

    // Create a new cmd
    router.post("/", cmd.create);

    // Retrieve all cmd
    router.get("/", cmd.findAll);

    // Retrieve all published cmds
    router.get("/published", cmd.findAllPublished);

    // Retrieve a single cmd with id
    router.get("/:id", cmd.findOne);

    // Update a cmd with id
    router.put("/:id", cmd.update);

    // Delete a cmd  with id
    router.delete("/:id", cmd.delete);

    // Create a new cmd
    router.delete("/", cmd.deleteAll);

    app.use("/api/cmd", router);
};