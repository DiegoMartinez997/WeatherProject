const express = require("express");
const https = require ("https");
const bodyParser = require ("body-parser");
const { log } = require("console");

const app = express();

app.use (bodyParser.urlencoded ({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")

});

app.post ("/index.html", function(req, res){
    const query = req.body.cityName;
    const appKey = "4fdb09dace7c7c2ac08aca02238f94aa";
    const unit = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?appid=" + appKey + "&q=" + query + "&units=" + unit + "&";

    https.get (url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The weather is currently " + description + "</p>")
        res.write ("<h1>The temperature in " + query + "is " + temp + " degrees celcius</h1>")
        res.write ("<img src=" + iconURL + ">");
        res.send();
})
});

    
})





app.listen(3000, function (){
    console.log ("server runing on port 3000")
});




