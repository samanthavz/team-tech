process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
require('dotenv').config();
const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();
const port = 3000;
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server);
require("./controllers/passport")(passport);
const mongoose = require('mongoose');
const Msg = require('./static/public/scripts/messages.js');
const User = require('./models/user.js');
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log('connected');
}).catch(err => console.log(err))

// templating
app.set("views", "views");
app.set("view engine", "pug");
app.use(express.static(__dirname + "/static/public/"));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// run when client connects || Werkt niet in MVC omdat socket direct bij de server.listen PORT moet zijn
io.on('connection', socket => {
  Msg.find()
  socket.on('chatMessage', (msg, timeNow) => {
    time = new Date();
    timeNow = time.getHours() + `:` + (time.getMinutes()<10?'0':'') + time.getMinutes();
    const newMessage = new Msg({msg, timeNow})
    newMessage.save().then(() => {
      io.emit('message', {msg, timeNow})
    })
  })
})

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

//connect
server.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
