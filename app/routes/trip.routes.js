module.exports = app => {
    const trips = require("../controllers/trip.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Trip
    router.post("/", trips.create);
  
    // Retrieve all Trips
    router.get("/", trips.findAll);
  
    // Retrieve a single Trip with id
    router.get("/:id", trips.findOne);
  
    // Update a Trip with id
    router.put("/:id", trips.update);
  
    // Delete a Trip with id
    router.delete("/:id", trips.delete);
  
    // Create a new Trip
    router.delete("/", trips.deleteAll);
  
    app.use("/api/trips", router);
  };
  