//controlles.js manages all the routes in router.js
const { DatabaseHandler } = require("../models/Model")
const database = new DatabaseHandler();

// let liked = [];
// let doggoList = [];
// let profile = [];

exports.renderWelcomePage = (req, res) => {
  res.render("welcome", {
    title: "Doggo app",
    message: "This is my matching app",
  });
};

exports.renderHomePage =  async (req, res) => {
  let doggoList = [];
  let profile = [];

  try {
    const userCursor = await database.fetchProfiles();
    const doggoCursor = await database.fetchDoggos();

    await userCursor.forEach((user) => {
      profile.push(user);
    });

    // wait for data
    await doggoCursor.forEach((doc) => {
      let push = false;
      profile[0].likedDoggos.forEach(function (dog) {
        if (doc.userId === dog.userId) {
          push = true;
        }
      });
      profile[0].dislikedDoggos.forEach(function (dog) {
        if (doc.userId === dog.userId) {
          push = true;
        }
      });
      if (!push && doc.age <= profile[0].maxAge) {
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
  let liked = [];

  res.render("matches", {
    title: "Doggo Matches",
    liked,
  });
};

exports.deleteMatch = (req, res) => {
  res.send("your doggo has been deleted");
};

exports.likedMatch = (req, res) => {
  res.send("your doggo has been liked");
};

exports.dislikedMatch = (req, res) => {
  res.send("your doggo has been disliked");
};

exports.renderProfilePage = (req, res) => {
  res.render("profile", {
    title: "Profile"
  });
}
