module.exports = function (app) {
  var User = require("../controllers/User");
  var auth = require("./verifyToken");

  // todoList Routes
  app.route("/signup").post(User.registration);
  app.route("/login").post(User.login);
  app.post("/task", auth, User.createTask);
  app.get("/all-task", auth, User.allTask);
  app.get("/all-project", auth, User.allProject);
};
