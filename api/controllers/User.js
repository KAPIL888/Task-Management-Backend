const mongoose = require("mongoose");
const User = mongoose.model("Users");
const TimeEntry = mongoose.model("TimeEntry");
const Project = mongoose.model("Project");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registrationValidation,
  loginValidation,
} = require("../validation/validation");

exports.registration = async function (req, res) {
  // validation
  const { error } = registrationValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  // check user already exist
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) return res.status(400).send({ error: "Email Already exist" });

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const userObj = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  };
  obj = new User(userObj);
  try {
    data = await obj.save();
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

exports.login = async function (req, res) {
  // validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // user check
  const userExist = await User.findOne({ email: req.body.email });
  if (!userExist) return res.status(400).send("Email not found");

  // check user valid
  const valid = await bcrypt.compare(req.body.password, userExist.password);
  if (!valid) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: userExist._id }, process.env.SECRET_TOKEN_KEY);
  res.header("Token", token).status(200).send({ token: token });
};

exports.createTask = async function (req, res) {
  project = await Project.findOne({ _id: req.body.project });
  if (!project) return res.status(400).send({ error: "Project not found" });
  const task = {
    user: req.user._id,
    name: req.body.name,
    project: project.name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };
  obj = new TimeEntry(task);
  try {
    data = await obj.save();
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.allTask = async function (req, res) {
  all = await TimeEntry.find({ user: req.user._id });
  try {
    res.status(200).send(all);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.allProject = async function (req, res) {
  all = await Project.find({});
  try {
    res.status(200).send(all);
  } catch (error) {
    res.status(400).send(error);
  }
};
