const express = require("express");
const https = require('https');

const app = express()



app.get("/", (req,res) =>{

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Gaya&appid=9e856d299f5a0c61a9da710272342aa7'

    https.get(url ,(response) =>{
       console.log(response)
    })  
    res.json(response);
})



app.listen(3000 , function(){
    console.log("Server is running on PORT 3000.")
})