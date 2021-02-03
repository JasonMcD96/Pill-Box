// Restricts routes the user is not allowe to access
module.exports = function (req, res, next) {
    // if user is loggin in, continue with request to the restricted route
    if (req.user) {
        return next();
    }

    // If user is not logged in, redirect to login page
    return res.redirect("/");
};

