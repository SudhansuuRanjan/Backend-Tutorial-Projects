const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  var today = new Date();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var day = days[today.getDay()];
  var month = months[today.getMonth()];
  var year = today.getFullYear();

  res.render("list", { today:today , kindOfDay: day, kindOfMonth: month, kindOfYear: year });
});

app.post("/",(req,res) =>{
 var item =  req.body.newItem ;
 console.log(item)
})

app.listen(3000, () => {
  console.log("server started on port 3000");
});
