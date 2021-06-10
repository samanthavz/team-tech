const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");

const app = express();
const port = 3000;
require("./config/passport")(passport);

mongoose
  .connect(
    "mongodb+srv://Jabir:Teampugsjabir1@doggoapp.e9zp8.mongodb.net/DoggoApp?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// templating
app.set("views", "views");
app.set("view engine", "pug");
app.use(express.static(__dirname + "/static/public/"));

app.use(
  require("express-session")({
    secret: "Any normal Word", //decode or encode session
    resave: false,
    saveUninitialized: false,
  })
);

// For parsing nested JSON objects
// see https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
app.use(express.json()); //Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
//Passport config
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// MVC model: https://www.youtube.com/watch?v=dDjzTDN3cy8
const router = require("./router");
app.use("/", router);

//In app.js
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

//connect
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
