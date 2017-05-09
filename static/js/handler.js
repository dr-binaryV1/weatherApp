document.getElementById("requestForecast").onclick = function () {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
            if (xmlhttp.status === 200) {
                document.getElementById("submitEmail").disabled = false;

                var jsonBody = JSON.parse(xmlhttp.responseText);
                for(var i=0; i < jsonBody.length; i++) {
                    if (jsonBody[i].city === "Mobay" && jsonBody[i].isRainy === false) {
                        document.getElementById("mobayCondition").innerHTML = "Sunny";
                        document.getElementById("mobayIcon").setAttribute("src", "images/sunny-icon.png");
                    } else if (jsonBody[i].city === "Mobay" && jsonBody[i].isRainy === true) {
                        document.getElementById("mobayCondition").innerHTML = "Rainy";
                        document.getElementById("mobayIcon").setAttribute("src", "images/rain.png");
                    }

                    if (jsonBody[i].city === "Kingston" && jsonBody[i].isRainy === false) {
                        document.getElementById("kingstonCondition").innerHTML = "Sunny";
                        document.getElementById("kgnIcon").setAttribute("src", "images/sunny-icon.png");
                    } else if (jsonBody[i].city === "Kingston" && jsonBody[i].isRainy === true) {
                        document.getElementById("kingstonCondition").innerHTML = "Rainy";
                        document.getElementById("kgnIcon").setAttribute("src", "images/rain.png");
                    }
                }

                document.getElementById("reqResult").setAttribute("class", "alert alert-info");

                var theDate = new Date(Date.now());
                var dateString = theDate.toDateString();
                var timeString = theDate.toTimeString();

                document.getElementById("reqResult").innerHTML = "Last Request Made: "+dateString+ " "+timeString;
            }
            else if (xmlhttp.status === 400) {
                document.getElementById("reqResult").setAttribute("class", "alert alert-danger");
                document.getElementById("reqResult").innerHTML = "There was an error 400";
            }
            else {
                document.getElementById("reqResult").setAttribute("class", "alert alert-danger");
                document.getElementById("reqResult").innerHTML = "There was an unexpected error. Try again Later";
            }
        }
    };
    xmlhttp.open("GET", "http://localhost:8080/forecast", true);
    xmlhttp.send();
};

document.getElementById("submitEmail").onclick = function () {
    var emailBody = document.getElementById("messageBody");
    var participants = document.getElementById("participants");
    var city = document.getElementById("cityOption");

    var jsonData = {
        city: city.value,
        recipients: participants.value,
        body: emailBody.value
    };

    $.ajax({
        url: "http://localhost:8080/email",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(jsonData),
        success: function(result){
            document.getElementById("result").setAttribute("class", "alert alert-success");
            document.getElementById("result").innerHTML = result;
        }
    });
};