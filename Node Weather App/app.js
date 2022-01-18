const express = require("express");
const https = require('https');
const bodyParser = require('body-parser')

const app = express()
const apikey = "9e856d299f5a0c61a9da710272342aa7"

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/index.html")   
})

app.post("/" , (req,res) =>{
   console.log(req.body.cityName)
   let city = req.body.cityName ;
   const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid='+ apikey 
    https.get(url ,(response) =>{
       console.log(response.statusCode +" "+ response.statusMessage)
       response.on("data", function(data){
          const weatherData = JSON.parse(data)
          res.write("<p> The weather is currently "+ weatherData.weather[0].main +".</p>");
          res.write("The temperature in "+ city + " is " + weatherData.main.temp + " degree C.");
          res.write('<br/><img src="http://openweathermap.org/img/wn/50n@4x.png" />');
          res.send();

       })
    })  
})

 

   



app.listen(3000 , function(){
    console.log("Server is running on PORT 3000.")
})