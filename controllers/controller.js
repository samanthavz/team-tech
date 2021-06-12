//controlles.js manages all the routes in router.js
const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const app = express();
const User = require("../models/user");
const { DatabaseHandler } = require("../models/Model");
const database = new DatabaseHandler();
let liked = [];
let doggoList = [];
let profile = [];

exports.renderWelcomePage = (req, res) => {
  res.render("welcome", {
    title: "Doggo app",
    message: "This is my matching app",
  });
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/userprofile",
      failureRedirect: "/login",
    }),
    function (req, res) {}
  );
};

exports.renderRegister = (req, res) => {
  res.render("register");
};
exports.postRegister = async (req, res) => {
  const { email, password, name, lastName, age } = req.body;
  console.log(req.body);
  if (!email || !password || !name || !lastName || !age) {
    console.log("Please enter all fields");
  }

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        console.log("Email already exists");
        res.render("register");
      } else {
        const newUser = new User({
          email,
          password,
          name,
          lastName,
          age,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((usr) => {
                console.log("Registration successful!");
                res.redirect("/home");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log("Registration error", err.message));
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
};

exports.renderHomePage = async (req, res) => {
  doggoList = [];

  try {
    const userCursor = await database.fetchProfiles();
    const doggoCursor = await database.fetchDoggos();

    await userCursor.forEach((user) => {
      profile.push(user);
    });

    // wait for data
    await doggoCursor.forEach((doc) => {
      let push = false;
      profile[0].likedDoggos.forEach(function (dog) {
        if (doc.userId === dog.userId) {
          push = true;
        }
      });
      profile[0].dislikedDoggos.forEach(function (dog) {
        if (doc.userId === dog.userId) {
          push = true;
        }
      });
      if (!push && doc.age <= profile[0].maxAge) {
        doggoList.push(doc);
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    res.render("home", { title: "DoggoSwipe", doggo: doggoList[0] });
  }
};

exports.renderMatchesPage = (req, res) => {
  res.render("matches", {
    title: "Doggo Matches",
    liked,
  });
};

exports.deleteMatch = async (req, res) => {
  bodyId = Number(req.body.dog);
  try {
    await database.deleteDoggos(req);

    liked.forEach((dog) => {
      if (dog.userId == bodyId) {
        let index = liked.indexOf(dog);
        if (index > -1) {
          liked.splice(index, 1);
        }
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    res.redirect("/matches");
  }
};

exports.likedMatch = (req, res) => {
  liked.push(doggoList[0]);
  profile[0].likedDoggos.push(doggoList[0]);

  setTimeout(redirect, 1500);
  function redirect() {
    res.redirect("/home");
  }
};

exports.dislikedMatch = (req, res) => {
  profile[0].dislikedDoggos.push(doggoList[0]);
  res.redirect("/home");
};

exports.renderProfilePage = (req, res) => {
  res.render("profile", {
    title: "Profile",
  });
};
