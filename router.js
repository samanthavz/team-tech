//router.js handles all the routes

const express = require("express");
const router = express.Router()
const controller = require("./controllers/controller")

router.get("/", controller.renderWelcomePage);

router.get("/home", controller.renderHomePage);

//error handling
router.use((req, res, next) => {
  res.status(404).send("sorry can't find that!");
});

module.exports = router;
