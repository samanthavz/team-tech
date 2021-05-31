const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

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

  async fetchProfiles(filterquery){
    const database = this.client.db("DoggoSwipe");
    const users = database.collection("Users");

    // fetch the data user
    const userCursor = await users.find(filterquery);

    return userCursor
  }

  async fetchDoggos(){
    // connect to the database and collection for doggo and user
    const database = this.client.db("DoggoSwipe");
    const doggos = database.collection("Doggos");


    // fetch the data doggos
    const doggoCursor = doggos.find({});

    return doggoCursor
  }
}




