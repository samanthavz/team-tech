const express = require("express");
const dotenv = require("dotenv");
const app = express();
const port = 3000;

// see https://www.npmjs.com/package/dotenv
dotenv.config();

// templating
app.use(express.static(__dirname + "/static/public/"));

// For parsing nested JSON objects
// see https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json());

app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("welcome", {
  });
});

//error handling
app.use((req, res, next) => {
  res.status(404).send("sorry can't find that!");
});

//connect
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});