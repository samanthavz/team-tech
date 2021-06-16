// Model.js is used for database communication
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🥭 mAngoDB Connected..."))
  .catch((err) => console.log(err));

exports.DatabaseHandler = class {
  constructor() {
    this.client = new MongoClient(process.env.DB_CONNECT, {
      retryWrites: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    // connect to client
    this.connection = this.client.connect();
  }

  // filterquery for Jabir to make it easier to find the current profile
  async fetchProfiles(filterquery) {
    const database = this.client.db("DoggoSwipe");
    const users = database.collection("Users");

    // fetch the data user
    const userCursor = await users.find(filterquery);

    return userCursor;
  }

  async fetchDoggos() {
    // connect to the database and collection for doggo and user
    const database = this.client.db("DoggoSwipe");
    const doggos = database.collection("Doggos");

    // fetch the data doggos
    const doggoCursor = await doggos.find({});

    return doggoCursor;
  }

  async deleteDoggos(req) {
    let bodyId = Number(req.body.dog);
    // connect to the database and collection
    const database = this.client.db("DoggoSwipe");
    const collection = database.collection("Doggos");

    // delete the doggo
    await collection.deleteOne({ userId: bodyId });
  }

  async fetchChats() {
    // connect to the database and collection for chat and user
    const database = this.client.db("DoggoSwipe");
    const chats = database.collection("msgs");
  
    // fetch the data chats
    const chatMessages = await chats.find({});
  
    return chatMessages;
  }
  
};
  async editProfile(req) {
    const database = this.client.db("DoggoSwipe");
    const collection = database.collection("Users");

    let Id = req.body.userId;
    // https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
    let o_id = new ObjectId(Id);
    let data = req.body;

    for (const item in data) {
      let update = `${data[item]}`;
      // console.log(item);
      if (item === "breed") {
        collection.findOneAndUpdate(
          { _id: o_id },
          { $push: { [item]: update } }
        );
      } else {
        await collection.findOneAndUpdate(
          { _id: o_id },
          { $set: { [item]: update } }
        );
      }
    }
  }
};
