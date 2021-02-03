var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new LocalStrategy(
    // User signs in using email
    {
        usernameField: "email"
    },
    function (email, password, done) {
        // below check that the user has already has a username and password in db.
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function (dbUser) {
            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect email."
                });
            }
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, dbUser);
        });
    }
));

// Boilerplate code for functionality of authentication
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = passport;