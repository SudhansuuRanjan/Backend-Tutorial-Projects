//jshint esversion:6
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "Please insert a name"]
    },
    rating: {
        type:Number,
        min:1,
        max:10
    },
    review:String
});


const Fruit = mongoose.model("Fruit",fruitSchema);

const grapes = new Fruit({ 
    name: 'Grapes',
    rating:8,
    review:"A bit sour."
     });

const kiwi = new Fruit({ 
    name: 'Kiwi',
    rating:10,
    review:"Best Fruit"
     });

const orange = new Fruit({ 
    name:'Kiwi',
    rating:8,
    review:"Too sour"
     });

const banana = new Fruit({ 
    name: 'Banana',
    rating:8,
    review:"it's awesome"
     });

// Fruit.insertMany([grapes, kiwi , orange , banana] , (err)=>{
//    if(err){
//        console.log(err)
//    }else{
//        console.log("Successfully saved!!")
//    }
// });

// Fruit.deleteOne({name:"Orange"}, (err)=>{
//     if(err){
//         console.log(err)
//     }else{
//      console.log("Successfully deleted!")   
//     }
// })


Fruit.find((err, fruits)=>{
   if(err){
       console.log(err)
   }else{
       //console.log(fruits);
       fruits.forEach((fruit)=>{
           console.log(fruit.name);
       })
   } 
})

// Fruit.updateOne({_id:"61eeaf618b22f088cfdf1d2b"}, {name:"Orange"}, (err)=>{
//     if(err){
//         console.log(err)
//     }else{
//      console.log("Successfully updated!")   
//     }
// })


const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person",personSchema);

// const pineapple = new Fruit({ 
//     name: 'Pineapple',
//     rating:9,
//     review:"it's a great fruit"
//      });

// pineapple.save();

// const person = new Person({ 
//     name: 'Anshika',
//     age:7,
//     favouriteFruit:kiwi
//      });

// person.save();

Person.updateOne({name:'Anshika'},{favouriteFruit: banana} , (err)=>{
    if(err){
        console.log(err)
    }else{
     console.log("Successfully updated!")   
    }
})

// Person.deleteMany({name:'Sudhanshu'}, (err)=>{
//     if(err){
//         console.log(err)
//     }else{
//      console.log("Successfully deleted persons!")   
//     }
// })


