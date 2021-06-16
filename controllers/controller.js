//controlles.js manages all the routes in router.js
const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const app = express();
const User = require("../models/user");
const transporter = require("./mailer");
// https://stackoverflow.com/questions/48433783/referenceerror-fetch-is-not-defined
const fetch = require("node-fetch");
const { DatabaseHandler } = require("../models/Model");
const database = new DatabaseHandler();

let liked = [];
let doggoList = [];
let profile = [];
let breeds = [];

// let api_key = "933e2e7b-e77c-4a9d-a225-91329dc556b1"

funcName("https://api.thedogapi.com/v1/breeds?limit=200&page=0");
async function funcName(url) {
  const response = await fetch(url);
  var data = await response.json();
  data.forEach((item) => breeds.push(item.name));
}

exports.renderWelcomePage = (req, res) => {
  res.render("welcome", {
    title: "Doggo app",
    h3: "This is my matching app",
  });
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/userprofile",
      failureRedirect: "/login",
    })
  );
};

exports.renderRegister = (req, res) => {
  res.render("register");
};

exports.postRegister = async (req, res) => {
  const { email, password, name, lastName, age, maxAge, img, status } =
    req.body;
  console.log(req.body);
  if (!email || !password || !name || !lastName || !age || !maxAge) {
    console.log("Please enter all fields");
  }

  User.findOne({ email: email }).then((user) => {
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
        maxAge,
        img,
        status,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(() => {
              console.log("✅ Registration successful!");
              res.redirect("/home");
            })
            .catch((err) => console.log(err));
        });
      });
      let mailOptions = {
        from: "🐶 DoggoSwipe 🐶 <doggoswipe@gmail.com>",
        to: newUser.email,
        subject: "Thanks for joining DoggoSwipe🐕",
        text: `
        Hey ${newUser.name}!
        We are super happy for joining DoggoSwipe!
        Have fun with the Doggo's 🐶!
        `,
        attachments: [
          {
            filename: "BannerThanksForJoining.png",
            path: "./static/public/images/BannerThanksForJoining.png",
          },
        ],
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log(err);
          return false;
        }
        //console.log(result);
        console.log("📤 Email sent to %s!", newUser.name);
      });
    }
  });
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

    // wait for da
    await doggoCursor.forEach((doc) => {
      const user = req.user;
      let push = false;
      user.likedDoggos.forEach(function (dog) {
        if (doc.userId === dog.userId) {
          push = true;
        }
      });
      user.dislikedDoggos.forEach(function (dog) {
        if (doc.userId === dog.userId) {
          push = true;
        }
      });
      if (!push && doc.age <= user.maxAge) {
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
  let bodyId = Number(req.body.dog);
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

exports.likedMatch = async (req, res) => {
  try {
    liked.push(doggoList[0]);
    const user = req.user;
    const currentUser = await User.findById(user._id);
    currentUser.likedDoggos.push(doggoList[0]);
    await currentUser.save();
  } catch (error) {
    console.log(error);
  }
  setTimeout(redirect, 1500);
  function redirect() {
    res.redirect("/home");
  }
};

exports.dislikedMatch = async (req, res) => {
  try {
    const user = req.user;
    const currentUser = await User.findById(user._id);
    currentUser.dislikedDoggos.push(doggoList[0]);
    await currentUser.save();
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};

exports.renderProfilePage = (req, res) => {
  const user = req.user;
  res.render("profile", {
    title: "Profile",
    user: user,
    breeds,
  });
};

exports.editProfilePage = async (req, res) => {
  // console.log(req.body.userId)
  try {
    await database.editProfile(req);
  } catch (error) {
    console.error(error);
  } finally {
    res.redirect("/profile");
  }
};
