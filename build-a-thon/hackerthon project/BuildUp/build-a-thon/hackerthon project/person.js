var express = require("express");
var path=require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require("passport");
//var LocalStrategy  = require("passport-local");
var passportLocalMongoose  = require("passport-local-mongoose");
var Problem = require("./problem");
//mongoose.connect("mongodb://localhost/shopzone");
app.use(bodyParser.urlencoded({extended : true}));
app.use('', express.static(path.join(__dirname + '')));
app.set('views', path.join(__dirname, 'views'));

var PersonSchema = new mongoose.Schema ({
   username : String,
   email : String,
   password : String,
   con_password : String, 
   con_number : Number,
   city : String ,
   address : String,
   problem : [{
   	  name : String,
   	  image : String,
   	  description : String
   }]
});

PersonSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Person" , PersonSchema);
