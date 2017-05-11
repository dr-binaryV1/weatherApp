document.getElementById("requestForecast").onclick = function () {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
            if (xmlhttp.status === 200) {
                document.getElementById("submitEmail").disabled = false;
                document.getElementById("emailForm").style.display = "block";

                var jsonBody = JSON.parse(xmlhttp.responseText);

                function getIcon(index, i){
                    if(jsonBody[index].forecast[i].isRainy === true &&
                        jsonBody[index].forecast[i].desc === "light rain"){
                        return "../images/light_rain.png";
                    } else if (jsonBody[index].forecast[i].isRainy === true) {
                        return "../images/rain.png";
                    } else if (jsonBody[index].forecast[i].isRainy === false &&
                        jsonBody[index].forecast[i].desc === "few clouds") {
                        return "../images/cloudy.png";
                    } else {
                        return "../images/sunny-icon.png";
                    }
                }

                function getDay(index, i){
                    if(index === 0){
                        return "Today";
                    } else if(index === 1) {
                        return "Tomorrow";
                    } else {
                        var dateTime = jsonBody[i].forecast[index].dateTime;
                        dateTime = new Date(dateTime * 1000);
                        var day = dateTime.toDateString();
                        day = day.split(" ");
                        return day[0];
                    }
                }

                document.getElementById("forecasts").innerHTML = "";
                document.getElementById("cityOption").innerHTML = "";
                for(var i=0; i < jsonBody.length; i++) {
                    document.getElementById("forecasts").innerHTML += "<br>" +
                        "<div id='"+jsonBody[i].city+"forecast' align='center' " +
                        "style='width: 100%; float: right; margin-left: 2%'>" +
                            "<h1 align='center'>"+ jsonBody[i].city +" Forecast</h1>" +
                        "</div>";

                    for(var y = 0; y < jsonBody[i].forecast.length; y++){
                        document.getElementById(jsonBody[i].city+"forecast").innerHTML += "" +
                            "<div style='float:left; margin-right: 2%' align='center'>" +
                            "<h2>"+ getDay(y, i) +"</h2>" +
                            "<h4>"+ jsonBody[i].forecast[y].main +"</h4>" +
                            "<p>"+ jsonBody[i].forecast[y].desc +"</p>" +
                            "<img src='"+ getIcon(i, y) +"' width='230' height='230' />" +
                            "</div>"
                    }

                    document.getElementById("forecasts").innerHTML += "<hr>";

                    document.getElementById("cityOption").innerHTML += "<option id='"+jsonBody[i].city+
                        "'>"+jsonBody[i].city+"</option>"
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
    xmlhttp.open("GET", "https://forecastchecker.herokuapp.com/forecast", true);
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
        url: "https://forecastchecker.herokuapp.com/email",
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