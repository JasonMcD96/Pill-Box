$(document).ready(function() {
    $("#loginSubmit").on("click", function(event){
        event.preventDefault();
        console.log('You clicked it!')
    })

    $("#signUpSubmit").on("click", function(event){
        event.preventDefault();
        console.log("You clicked sign up!")
        let emailInput = $("input#email")
        let passwordInput = $("input#password")

        let userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        }

        console.log("Data Test: ",userData)
        // send ajax post request
        $.ajax("/api/signup", {
            type: "POST",
            data: userData
          }).then(
            function() {
              console.log("created user");
              // Reload the page to get the updated list
              location.reload();
            }
          );
    })

})
