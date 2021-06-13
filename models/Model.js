// Model.js is used for database communication
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const { ObjectId } = require("mongodb");


dotenv.config();

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

  async editProfile(req) {
    let Id = req.body.userId;
    let firstName = req.body.firstName;
    // let lastName = req.body.lastName
    // let age = Number(req.body.age)
    // let dogAge = Number(req.body.dogAge)
    // let breed = req.body.breed;

    let data = req.body
    console.log(req.body)

    for(const item in data) {
      console.log(`${item}: ${data[item]}`);
    }

    const database = this.client.db("DoggoSwipe");
    const collection = database.collection("Users");

    // https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
    var o_id = new ObjectId(Id);

    await collection.findOneAndUpdate(
      { _id: o_id },
      { $set: { name: firstName } }
    );
  }
};
