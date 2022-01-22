const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req,res) =>{
    res.send("Hello world")
})

app.listen(3000, () =>{
   console.log("server started on port 3000");
})