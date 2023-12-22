module.exports = (userapp) => {
  const user = require("../controllers/user.controller.js");
  let router = require("express").Router();


  router.get("/", user.getAllUsers);
  router.get("/me/infos", user.getUserInfo)
  router.get("/:id", user.getUserById);

  userapp.use("/users", router);
};
