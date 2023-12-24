module.exports = (userapp) => {
  const user = require("../controllers/user.controller.js");
  const checkJwt = require('../middlewares/auth.keycloack.js');
  let router = require("express").Router();



  router.get("/", user.getAllUsers);
  router.get("/me/infos", user.getUserInfo)
  router.get("/:id", user.getUserById);

  userapp.use("/users", checkJwt, router);
};
