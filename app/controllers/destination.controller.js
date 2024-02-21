const db = require("../models");
const Destination = db.destinations;

// Create and Save a new Destination
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Destination
  const destination = new Destination({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    price: req.body.price,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    tags: req.body.tags
  });

  // Save Destination in the database
  destination
    .save(destination)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Destination."
      });
    });
};

// Retrieve all Destinations from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Destination.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving destinations."
      });
    });
};

// Find a single Destination with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Destination.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Destination with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Destination with id=" + id });
    });
};

// Update a Destination by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Destination.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Destination with id=${id}. Maybe Destination was not found!`
        });
      } else res.send({ message: "Destination was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Destination with id=" + id
      });
    });
};

// Delete a Destination with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Destination.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Destination with id=${id}. Maybe Destination was not found!`
        });
      } else {
        res.send({
          message: "Destination was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Destination with id=" + id
      });
    });
};

// Delete all Destinations from the database.
exports.deleteAll = (req, res) => {
  Destination.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Destinations were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all destinations."
      });
    });
};

// Find all published Destinations
exports.findAllPublished = (req, res) => {
  Destination.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving destinations."
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

  Destination.findByIdAndUpdate({id: req.params.id}, updateSet, {new: true})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the destination"
      });
    });
}

