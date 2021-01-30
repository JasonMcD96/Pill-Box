// *****************************************************************************
// controller.js - this file offers a set of routes for displaying and saving data to the db
// *****************************************************************************

// Requiring our models
var db = require("../models");

// Routes
// ===================================================================
module.exports = function(app) {
    
    // Initial log in route
    app.get("/", function(req, res) {
        res.render("index");
    });
    
    // GET route for create user page
    app.get("/createuser", function(req, res) {
        res.render("createUser");
    });
    
    // GET route for getting all patients
    app.get("/api/patients", function(req, res) {
        db.Patient.findAll().then(function(dbPatients) {
            res.render("", dbPatients);
        });
    });

    // POST route for saving a new patient
    app.post("/api/patients", function(req, res) {
        db.Patient.create(req.body).then(function(dbPatient) {
            res.json(dbPatient);
        });
    });
};