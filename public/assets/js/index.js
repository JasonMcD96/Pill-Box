$(document).ready(function () {
    $("#loginSubmit").on("click", function (event) {
        event.preventDefault();
        console.log('You clicked it!')
        let emailInput = $("input#email")
        let passwordInput = $("input#password")

        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        emailInput.val("");
        passwordInput.val("");

        $.ajax("/api/login", {
            type: "POST",
            data: userData
        }).then(function () {

            window.location.replace("/dashboard");
            // If there's an error, log the error
        }).catch(function (err) {
            console.log(err);
        });

    })

    $("#signUpSubmit").on("click", function (event) {
        event.preventDefault();
        console.log("You clicked sign up!")
        let emailInput = $("input#email")
        let passwordInput = $("input#password")

        let userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        }

        if (!userData.email || !userData.password) {
            return;
        }

        emailInput.val("");
        passwordInput.val("");

        // send ajax post request
        $.ajax("/api/signup", {
            type: "POST",
            data: userData
        }).then(
            function () {
                console.log("created user");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    })

})
