document.getElementById("requestForecast").onclick = function () {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
            if (xmlhttp.status === 200) {
                document.getElementById("submitEmail").disabled = false;

                var jsonBody = JSON.parse(xmlhttp.responseText);

                function getIsRainy(index, i){
                    if(jsonBody[index].forecast[i].isRainy === false){
                        return "Sunny";
                    } else {
                        return "Rainy";
                    }
                }

                function getIcon(index, i){
                    if(jsonBody[index].forecast[i].isRainy === false){
                        return "../images/sunny-icon.png";
                    } else {
                        return "../images/rain.png";
                    }
                }

                function getLabel(index, i){
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

                for(var i=0; i < jsonBody.length; i++) {
                    document.getElementById("forecasts").innerHTML += "<br>" +
                        "<div id='"+jsonBody[i].city+"forecast' align='center' style='width: 100%; float: right'>" +
                            "<h1 align='center'>"+ jsonBody[i].city +" Forecast</h1>" +
                        "</div>";
                    for(var y = 0; y < jsonBody[i].forecast.length; y++){
                        document.getElementById(jsonBody[i].city+"forecast").innerHTML += "" +
                            "<div style='float:left'>" +
                            "<h2>"+ getLabel(y, i) +"</h2>" +
                            "<h4>"+ getIsRainy(i, y) +"</h4>" +
                            "<p>"+ jsonBody[i].forecast[y].desc +"</p>" +
                            "<img src='"+ getIcon(i, y) +"' width='250' height='250' />" +
                            "</div>"
                    }

                    document.getElementById("forecasts").innerHTML += "<br/>";

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