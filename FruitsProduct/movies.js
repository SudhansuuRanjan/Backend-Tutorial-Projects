//jshint esversion:6
const mongoose = require('mongoose');
mongoose.connect('ur uri');

const movieSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    description:String,
    releaseDate:Date
});


const Movie = mongoose.model("Movie",movieSchema);

const avengers = new Movie({ 
    name: 'Avengers',
    rating:8.5,
    review:"Awesome.",
    releaseDate: new Date()
     });


avengers.save()


Movie.find((err, movies)=>{
   if(err){
       console.log(err)
   }else{
       //console.log(fruits);
      mongoose.connection.close();
       movies.forEach((movie)=>{
           console.log(movie.name);
       })
   } 
})