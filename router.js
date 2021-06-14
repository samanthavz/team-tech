//router.js handles all the routes
const express = require("express");
const router = express.Router();
const controller = require("./controllers/controller");
const { lAuth, oAuth } = require("./controllers/auth");

router.get("/", oAuth, controller.renderWelcomePage);
router.get("/home", lAuth, controller.renderHomePage);
router.get("/matches", lAuth, controller.renderMatchesPage);
router.get("/register", oAuth, controller.renderRegister);
router.post("/register", controller.postRegister);
router.post("/login", controller.postLogin);
router.post("/matches/deleted", lAuth, controller.deleteMatch);
router.post("/matches/liked", lAuth, controller.likedMatch);
router.post("/matches/disliked", lAuth, controller.dislikedMatch);
router.get("/profile", lAuth, controller.renderProfilePage);
router.post("/profile/edit", controller.editProfilePage);

//error handling
router.use((req, res, next) => {
  res.status(404).send("sorry can't find that!");
});

module.exports = router;
