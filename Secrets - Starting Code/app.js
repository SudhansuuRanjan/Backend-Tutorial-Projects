//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session')
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
// const bcrypt = require("bcrypt");
// const saltRounds = 12;
const secret = process.env.SECRET;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB",()=>{
    console.log("Databse connected!!");
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/register",(req,res)=>{
    res.render("register");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/secrets",(req,res)=>{
    if(req.isAuthenticated()){
       res.render("secrets"); 
    }else{
        res.redirect("/login");
    }
});

app.post("/register",(req,res)=>{
    
    User.register({username : req.body.username}, req.body.password, (err,user)=>{
        if(err){
            console.log(err);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req,res,()=>{
               res.redirect("/secrets");
            })
        }
    })
})

app.post("/login",(req,res)=>{
    
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user,(err)=>{
       if(err){
           console.log(err);
       }else{
           passport.authenticate("local")(req, res,()=>{
               res.redirect("/secrets");
           });
       }
    })
})

app.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server started on port 3000.");
})