const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    },
  },
  { collection: "Users" }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
