// *****************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *****************************************************************************

// Requiring our models
var db = require("../models");
var passport = require("../config/passport");

// Routes
// ===================================================================
module.exports = function (app) {

    // POST route to log in
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    // POST route to sign up
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

    // POST route for saving a new patient
    app.post("/api/patient", function (req, res) {
        db.Patient.create({
            name: req.body.name,
            UserId: req.body.UserId,
        }).then(function (dbPatient) {
            res.json(dbPatient);
        });
    });

    // GET rout for finding one patient
    // app.get("/api/patients/:id", function (req, res) {
    //     db.Patient.findOne({
    //         where: {
    //             id: req.params.id
    //         },
    //         include: [db.Meds]
    //     }).then(function (dbPatient) {
    //         res.json(dbPatient);
    //     });
    // });

    // Route for getting data about user to be used on client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // If the user is not logged in send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });

};