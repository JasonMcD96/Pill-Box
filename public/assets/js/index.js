$(document).ready(function () {
    var currentDay = $("#currentDay");
    currentDay.text(moment().format('dddd, LL'));
    let withFood = 0;
    let taken = 0;

    $("#addPatient").on("click", function (event) {
        event.preventDefault();
        console.log("You clicked add patient!")

        // get the new patient's name
        let newName = $("#patientName").val().trim();
        let newPatient = {
            name: newName,
            // changed to UserId instead of caretaker, was not loading in db
            UserId: $(".member-name").data("id")
        }

        console.log("New Patient Info:", newPatient)
        $.ajax("/api/patient", {
            type: "POST",
            data: newPatient
        }).then(
            function () {
                console.log("created patient");
                // Reload the page to get the updated list
                location.reload();
            }
        );

    })

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
            alert("Click the 'Sign Up' link below to create a Pill Box account.");
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

    // GET request to get user's email
    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.email);
        $(".member-name").attr('data-id', data.id)
    });

    $("#addMedication").on('click', function(event){
        event.preventDefault();
        // get the id thats at the end of the url
        let string = document.URL.split('/')
        let id = string[string.length-1]
        console.log('URL PARAMS :',id)

        window.location.href = '/addmedication/'+id
    })

    $("#with-food-form :checkbox").change(function() {
        
        if (this.checked) {
            withFood = 1;
        }
        console.log(withFood)
    })

    $("#taken-form :checkbox").change(function() {
        if (this.checked) {
            taken = 1;
        }
    })

    $("#submit-medication").on("click", function(event) {
        event.preventDefault();

        // get the id thats at the end of the url
        let string = document.URL.split('/')
        let id = string[string.length-1]
        console.log('URL PARAMS :',id)

        // Get all data from form
        let medName = $("input#med_name");
        let dosage = $("input#dosage");
        let timesPd = $("select#timesPD");
        let notes = $("textarea#notes");

        let medData = {
            med_name: medName.val().trim(),
            dosage: dosage.val().trim(),
            timesPD: timesPd.val(),
            withFood: withFood,
            taken: taken,
            notes: notes.val().trim(),
            PatientId: id
        }

        console.log(medData)
        $.ajax("/api/medication", {
            type: "POST",
            data: medData
        }).then(function(dbMed) {
            window.location.href = '/patientrecord/' + dbMed.PatientId;
        });
    });
});
