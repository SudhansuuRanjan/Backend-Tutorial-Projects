const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs")

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect('mongodb://localhost:27017/wikiDB');

const articleSchema = {
    title:String,
    content:String
}

const Article = mongoose.model("Article", articleSchema)

const article1 = new Article({
    title:"lorem",
    content:"Wev Dev stands for web development."
})


////////// Requests Targeting input form /////////////

app.get('/',(req,res)=>{
    res.render("index");
})


////////// Requests Targeting all Articles /////////////


app.route('/articles')
   .get((req, res)=>{
        Article.find({}, function(err, foundArticles){
            res.send(foundArticles);
        })
        })

    .post((req,res)=>{
        const article1 = new Article({
            title:req.body.title,
            content:req.body.content
        })
        
        article1.save((err)=>{
            if(!err){
                res.send("New Article saved successfully!!!")
            }else{
                res.send(err);
            }
        });
        res.redirect("/");

    })

    .delete((req,res)=>{
        Article.deleteMany(function(err){
        if(!err){
            res.send("successfully deleted all articles");  
        }else{
            res.send(err)
        }
        })
});


////////// Requests Targeting Specific Articles /////////////


app.route('/articles/:articleTitle')
    .get((req,res)=>{
        Article.findOne({title: req.params.articleTitle},(err, foundArticle)=>{
           if(!err){
               res.send(foundArticle);
           }else{
               res.send(err)
           } 
        })
    })
    .put((req,res)=>{

        Article.findOneAndUpdate(
            {title: req.params.articleTitle},
            {title: req.body.title,
             content: req.body.content},(err)=>{
               if(!err){
                   res.send("Successfully updated using put!!")
               }else{
                   res.send(err)
               }
             });
       
    })
    .patch((req,res)=>{
        Article.updateOne(
            {title: req.params.articleTitle},
            {$set: req.body },
            (err)=>{
               if(!err){
                   res.send("Successfully updated using patch!!")
               }else{
                   res.send(err)
               } 
            }
        )
    });



app.listen(3000, function() {
  console.log("Server started on port 3000");
});