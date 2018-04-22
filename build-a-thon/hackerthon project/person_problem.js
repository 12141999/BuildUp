var express = require("express");
var path=require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var Person = require("./person");
var Problem = require("./problem");
var Comment = require("./comment");
//var doneDB = require("./person_problem");
//mongoose.connect("mongodb://localhost/hackerthon");
app.use(bodyParser.urlencoded({extended : true}));
app.use('', express.static(path.join(__dirname + '')));
app.set('views', path.join(__dirname, 'views'));

var data=[
{
   name : "agriculture problem",
   image :  "https://sp.yimg.com/ib/th?id=OIP.Kn-I3Hu6Q304p94Kb4ZENwHaFj&pid=15.1",
   description : "The essential joy of being with horses is that it brings us in contact with the rare elements of grace, beauty, spirit and freedom"
},
{
  name : "rabbit",
  image : "https://tse1.mm.bing.net/th?id=OIP.MSaoXnTUnGFtHQZP5cYa9gHaFj&pid=15.1&P=0&w=234&h=176",
  description  : "I loved 'Roger Rabbit' growing up "
},
{
  name : "house",
  image : "http://powerpictures.crystalgraphics.com/photo/3d_rendering_christmas_decorated_porch_with_little_trees_and_cg2p12245510c_th.jpg",
  description : "Houses are like people - some you like and some you don't like - and once in a while there is one you love "
}
]

function doneDB(){
       Problem.remove({},function(err){
          if(err)
          {
            console.log(err);
          }else{
            console.log("remove all problem");
          }
       });
      	 data.forEach(function(done){
       Problem.create(seed,function(err,problem){
        if(err)
        {
        	console.log(err);
        }else{
        	console.log("added new data");
        	Comment.create({
        		text : "this is very beautiful",
        		author : "james bond"
        	},function(err,comment){
               if(err)
               {
               	console.log(err);
               }else{
               	console.log("add a comment");
               	problem.comments.push(comment);
               	problem.save();
               }
        	});
      }
      });
   });
      
}

module.exports = doneDB;