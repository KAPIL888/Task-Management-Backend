"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 222,
  },
  username: {
    type: String,
    required: true,
    min: 5,
    max: 222,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 222,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 222,
  },

  created_date: {
    type: Date,
    default: Date.now,
  },
});

var TimeEntry = new Schema({
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    default: Date.now,
  },
  end_date: {
    type: Date,
    default: Date.now,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

var Project = new Schema({
  name: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", User);
module.exports = mongoose.model("TimeEntry", TimeEntry);
module.exports = mongoose.model("Project", Project);
