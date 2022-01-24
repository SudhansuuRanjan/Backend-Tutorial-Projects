//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

const password = "";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://sudh12345:'+ password +'@cluster0.dssa4.mongodb.net/mflix?retryWrites=true&w=majority');

const itemsSchema = {
    name: String,
};

const Item = mongoose.model('Item',itemsSchema);

const item1 = new Item({name:"Go eat already"})
const item2 = new Item({name:"Go bath already"})
const item3 = new Item({name:"Go sleep already"})

const defaultItems = [item1 , item2 , item3]

const listSchema = {
  name: String,
  items:[itemsSchema]
};

const List = mongoose.model('List',listSchema);


const items = [];
const workItems = [];

app.get("/", (req, res) => {
 
  Item.find({},(err,result)=>{

    if(result.length === 0){
          Item.insertMany(defaultItems, (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("Successfully saved default items to db!!")
            }
          });
        res.redirect("/");
    }else{
      res.render("list", { newLists: result, listTitle: "Today" });
    }
  })

});

app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list; 
  const item = new Item({
    name:itemName
    })

  if( listName ==="Today"){
      item.save();
      res.redirect("/");
  }else{
      List.findOne({name:listName} , (err,foundList)=>{
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      })
  }
});

app.post("/delete",(req,res)=>{
   const checkedItemId = req.body.checkbox;

   Item.findByIdAndRemove(checkedItemId ,(err)=>{
      if(!err){
        console.log("Checked Item deleted successfully !!");
        res.redirect("/");
      }
   })

})


app.get("/:listType",(req,res)=>{
  const customListName = req.params.listType;
  
  List.findOne({name:customListName}, (err,foundList)=>{
     if(!err){
       if(!foundList){
         //Create a new List
         const list = new List({
            name:customListName,
            items:defaultItems
          })
          list.save();
          res.redirect("/" + customListName)
       }else{
         res.render("list",{ newLists: foundList.items, listTitle: foundList.name })
       }
     }
  })


})


app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
