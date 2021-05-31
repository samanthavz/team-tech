//controlles.js manages all the routes in router.js

exports.renderWelcomePage = (req, res) => {
  res.render("welcome", {
    title: "Doggo app",
    message: "This is my matching app",
  });
};

exports.renderHomePage = (req, res) => {
  let doggoList = [];

  res.render("home", {
    title: "DoggoSwipe",
    doggo: doggoList[0],
  });
};

exports.renderMatchesPage = (req, res) => {
  let liked = [];

  res.render("matches", {
    title: "Doggo Matches",
    liked,
  });
};

exports.renderProfilePage = (req, res) => {
  res.render("profile", {
    title: "Profile"
  });
}
