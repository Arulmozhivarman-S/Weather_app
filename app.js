const express = require("express");
const https =require("https");
const bodyParser=require("body-parser");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
})
app.post("/",function(req, res){
  
   const query=req.body.cityName;
   const apikey="4f7c39a41572f144555d73b1c3c0d7d3";
   const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid=" + apikey+ "&units=metric";
   https.get(url, function(response){
       console.log(response.statusCode);
       
       response.on("data",function(data){
           const weather=JSON.parse(data);
           const temp=weather.main.temp;
           const des=weather.weather[0].description;
               const icon=weather.weather[0].icon;
               const img="https://openweathermap.org/img/wn/"+ icon+"@2x.png";
           res.write("<h1>The weather in "+ query+" currently </h1>"+ temp +" "+des );
           res.write("<img src=" +  img +" >");
           res.send();
       })
   })
})


app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})