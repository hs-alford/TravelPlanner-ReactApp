const db = require("../models");
const Trip = db.trips;

// Create and Save a new Trip
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Trip
  const trip = new Trip({
    title: req.body.title,
    description: req.body.description,
    budget: req.body.budget,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    tags: req.body.tags
  });

  // Save Trip in the database
  trip
    .save(trip)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Trip."
      });
    });
};

// Retrieve all Trips from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Trip.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving trips."
      });
    });
};

// Find a single Trip with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Trip.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Trip with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Trip with id=" + id });
    });
};

// Update a Trip by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Trip.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Trip with id=${id}. Maybe Trip was not found!`
        });
      } else res.send({ message: "Trip was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Trip with id=" + id
      });
    });
};

// Delete a Trip with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Trip.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Trip with id=${id}. Maybe Trip was not found!`
        });
      } else {
        res.send({
          message: "Trip was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Trip with id=" + id
      });
    });
};

// Delete all Trips from the database.
exports.deleteAll = (req, res) => {
  Trip.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Trips were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all trips."
      });
    });
};


exports.updateTags = (req, res) => {
  let updateSet = {$push: {}};  //add to set used to not to replace existing rates

  if (req.body.tags != null) {
    const tags = {
      "name" : req.body.tags.name
    };

    updateSet.$push.tages = tags;
  }

  Trip.findByIdAndUpdate({id: req.params.id}, updateSet, {new: true})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the trip"
      });
    });
};
