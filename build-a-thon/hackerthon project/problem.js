var mongoose = require('mongoose');
var Person = require("./person");
var Comment = require("./comment");
var doneDB = require("./person_problem");

var ProblemSchema = new mongoose.Schema ({
   name : String,
   image : String,
   description : String,
   comments : [{
   	  text : String,
   	  author : String
   }]
});

module.exports = mongoose.model("Problem", ProblemSchema);