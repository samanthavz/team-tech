const express = require("express");
const dotenv = require("dotenv");
const app = express();
const port = 3000;
const router = require("./router")

// see https://www.npmjs.com/package/dotenv
dotenv.config();

// templating
app.set("views", "views")
app.set("view engine", "pug");
app.use(express.static(__dirname + "/static/public/"));

// For parsing nested JSON objects
// see https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json());

app.use("/", router)

//connect
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});