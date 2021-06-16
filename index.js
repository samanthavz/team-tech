const express = require("express");
const app = express();
const port = 3000;
const router = require("./router")
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server);
const mongoose = require('mongoose');
const Msg = require('./static/public/scripts/messages.js');
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log('connected');
}).catch(err => console.log(err))

// templating
app.set("views", "views")
app.set("view engine", "pug");
app.use(express.static(__dirname + "/static/public/"));

// run when client connects
io.on('connection', socket => {
  Msg.find()
  socket.on('chatMessage', (msg, timeNow, user) => {
    user = "GEBRUIKER"
    time = new Date();
    timeNow = time.getHours() + `:` + (time.getMinutes()<10?'0':'') + time.getMinutes();
    const newMessage = new Msg({msg, timeNow, user})
    newMessage.save().then(() => {
      io.emit('message', {msg, timeNow, user})
    })
  })
})

// For parsing nested JSON objects
// see https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json());

// MVC model: https://www.youtube.com/watch?v=dDjzTDN3cy8
app.use("/", router)

//connect
server.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});