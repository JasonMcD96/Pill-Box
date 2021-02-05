// Test
// Test 2
// ***************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server
// 
// ***************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var session = require("express-session");

// Requiring passport as configured
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Use sessions to keep track of user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
require("./controllers/html-routes")(app);
require("./controllers/api-routes")(app);

// Syncing our sequelize models and then starting our Express app (added force: true) to resyncs changes to the model and deletes
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});