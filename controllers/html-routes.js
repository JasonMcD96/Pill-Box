// *****************************************************************************
// html-routes.js - this file offers a set of routes for displaying and saving data to the db
// *****************************************************************************

// Requiring our models
var isAuthenticated = require("../config/isAuthenticated");

// Routes
// ===================================================================
var db = require("../models");

module.exports = function (app) {

    // Initial log in route
    app.get("/", function (req, res) {
        if (req.user) {
            res.redirect("/dashboard");
        }
        res.render("index");
    });

    // GET route for create user page
    app.get("/createuser", function (req, res) {
        if (req.user) {
            res.redirect("/dashboard");
        }
        res.render("createUser");
    });

    // Add isAuthenticated middleware
    app.get("/dashboard", isAuthenticated, function (req, res) {
        db.Patient.findAll({ raw: true }).then(function (dbPatients) {

            // converting patients to an object for handlebars
            var patients = { patients: dbPatients }
            res.render("dashboard", patients);
        });
    })


};