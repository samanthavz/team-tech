//controlles.js manages all the routes in router.js

exports.renderWelcomePage = (req, res) => {
  res.render("welcome")
}

exports.renderHomePage = (req, res) => {
  res.render("home");
};