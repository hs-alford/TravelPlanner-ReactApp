module.exports = app => {
  const destinations = require("../controllers/destination.controller.js");

  var router = require("express").Router();

  // Create a new Destination
  router.post("/", destinations.create);

  // Retrieve all Destinations
  router.get("/", destinations.findAll);

  // Retrieve all published Destinations
  router.get("/published", destinations.findAllPublished);

  // Retrieve a single Destination with id
  router.get("/:id", destinations.findOne);

  // Update a Destination with id
  router.put("/:id", destinations.update);

  // Delete a Destination with id
  router.delete("/:id", destinations.delete);

  // Create a new Destination
  router.delete("/", destinations.deleteAll);

  app.use("/api/destinations", router);
};
