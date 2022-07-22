const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
    });
app.post("/", (req,res)=>{

  const appKey = "c4d0d4cf941ab75fc58896965d62ee06";
  const unit = "metric";
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid=" + appKey;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", (data)=>{
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const placeName = weatherData.name;
      const icon = weatherData.weather[0].icon;

  const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp, weatherDescription);

      res.write("<h1>The temprature in " + placeName + " is " + temp + " degree celcius.</h1>");
      res.write("<p>The weather is currently showing " + weatherDescription + ".</p>");
      res.write("<img src="+ imageURL +"> ");
      res.send();
  });
});
});

app.listen("3000", function(){
  console.log("Server is running on port 3000.");
});
