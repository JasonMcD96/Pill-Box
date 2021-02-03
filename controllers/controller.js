// *****************************************************************************
// controller.js - this file offers a set of routes for displaying and saving data to the db
// *****************************************************************************

// Requiring our models
var db = require("../models");
var passport = require("../config/passport");

// Routes
// ===================================================================
module.exports = function (app) {

    // Initial log in route
    app.get("/", function (req, res) {
        res.render("index");
    });

    // GET route for create user page
    app.get("/createuser", function (req, res) {
        res.render("createUser");
    });

    // GET route for getting all patients
    app.get("/api/patients", function (req, res) {
        db.Patient.findAll().then(function (dbPatients) {
            res.render("", dbPatients);
        });
    });

    // GET rout for finding one patient
    app.get("/api/patients/:id", function (req, res) {
        db.Patient.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbPatient) {
            res.json(dbPatient);
        });
    });


    // POST route for saving a new patient
    app.post("/api/patient", function (req, res) {
        db.Patient.create(req.body).then(function (dbPatient) {
            res.json(dbPatient);
        });
    });





    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    app.post("/api/signup", function (req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(function () {
                res.redirect(307, "/api/login");
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });


};