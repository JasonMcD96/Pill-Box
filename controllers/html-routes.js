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
        console.log(req.user);
        db.Patient.findAll({
            raw: true,
            where: {
                UserId: req.user.id
            }
        }).then(function (dbPatients) {

            // converting patients to an object for handlebars
            var patients = { patients: dbPatients }
            res.render("dashboard", patients);
        });
    })

    // GET route for patient record
    app.get("/patientrecord/:id", isAuthenticated, function (req, res) {
        db.Meds.findAll({
            raw: true,
            where: {
                PatientId: req.params.id
            },
        }).then(function (dbPatient) {
            db.Patient.findOne({
                raw: true,
                where: {
                    id: req.params.id,
                },
            }).then(function (patient) {
                console.log(patient);
                var meds = {
                    meds: dbPatient,
                    name: patient.name
                }
                console.log(meds)
                res.render("patient", meds)
            })
        });
    });

    // GET route to add medication
    app.get("/addmedication/:id", isAuthenticated, function (req, res) {
        db.Patient.findOne({
            raw: true,
            where: {
                id: req.params.id,
            },
        }).then(function (patient) {
            console.log(patient);
            var patientName = {
                name: patient.name
            }
            res.render("medicine", patientName)
        })
    })
};