const dbConfig = require("../config/config.db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.cmd = require("./cmd.js")(mongoose);

module.exports = db;
