const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/" , function(req, res){
   const firstName = req.body.fname ;
   const lastName = req.body.lname ;
   const Email = req.body.email;

   const data = {
       members: [
           {
            email_address : Email ,
            status : "subscribed",
            merge_fields:{
               FNAME: firstName,
               LNAME: lastName 
              }
           }
       ]
   };

   const jsonData = JSON.stringify(data);
   const url = "https://us20.api.mailchimp.com/3.0/lists/08b328bafa";

   const options = {
       method: "POST",
       auth: "Spectre_7:6ea7b42c5b9a500755a3afd99cc9807b-us20"
   }

   const request = https.request(url , options , function(response){

     if( response.statusCode === 200){
         res.sendFile(__dirname + "/success.html")
     }else{
        res.sendFile(__dirname + "/failure.html")
     }

      response.on("data",(data)=>{
        //console.log( JSON.parse(data));  
      })
   })

   request.write(jsonData);
   request.end();

})


app.post("/failure", (req,res)=>{
    res.redirect("/")
})


app.listen(process.env.PORT || 3000 , function(){
    console.log("Server is running on PORT 3000.")
})

//API key
// 6ea7b42c5b9a500755a3afd99cc9807b-us20
// 08b328bafa.