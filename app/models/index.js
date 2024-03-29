const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.destinations = require("./destination.model.js")(mongoose);
db.trips = require("./trip.model.js")(mongoose);

module.exports = db;
