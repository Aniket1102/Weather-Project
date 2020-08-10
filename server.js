const express = require ("express");
const https = require ("https");
const bodyParser = require ("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){

 var city=req.body.cityName;
 var url = "https://api.openweathermap.org/data/2.5/weather?q=" +city +"&units=metric&appid=5a6d14999127af475eb5f5b2deb92099";

 https.get(url,function(response){
   console.log(response.statusCode);

   response.on("data",function(data){
     const weatherData = JSON.parse(data);
     console.log(JSON.parse(data));

     const temperature = weatherData.main.temp;
     const weatherDescription = weatherData.weather[0].description;
     const icon=weatherData.weather[0].icon;
     const iconUrl=  "http://openweathermap.org/img/wn/"+icon+"@2x.png";


     res.write("<h1>Temperature: " + temperature + " C"  + "</h1>" );
     res.write("<h2> Weather Description: " + weatherDescription + "</h2>");
     res.write("<img src="+iconUrl+">");
     res.send();

   });
 });


});

app.listen(3000,function(){
  console.log("Server Started ...");
});
