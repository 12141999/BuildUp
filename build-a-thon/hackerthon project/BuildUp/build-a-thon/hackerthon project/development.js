var express = require("express");
var path=require('path');
//var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy  = require("passport-local");
var passportLocalMongoose  = require("passport-local-mongoose");
var app = express();
var bodyParser = require('body-parser');
/*var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;*/
var mongoose = require('mongoose');
var Person = require("./person");
var Problem = require("./problem");
mongoose.connect("mongodb://localhost/hackerthon");
app.use(bodyParser.urlencoded({extended : true}));
app.use('', express.static(path.join(__dirname + '')));
app.set('views', path.join(__dirname, 'views'));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Person.authenticate()));
passport.serializeUser(Person.serializeUser());
passport.deserializeUser(Person.deserializeUser());

app.post("/personregister",function(req,res){
   var username = req.body.username;
   var email = req.body.email;
   var password = req.body.password;
   var con_password = req.body.con_password;
   var con_number = req.body.con_number;
   var city = req.body.city;
   var address = req.body.address;
   var newdata = {username : username , email : email , password : password , con_password : con_password , con_number : con_number , city : city , address : address};
   Person.register(new Person({username : username , email : email ,con_number : con_number , city : city , address : address}),password,function(err,person){
     if(err){
     	console.log(err);
     	return res.render("personregister.ejs");
     }
     console.log(person);
     passport.authenticate("local")(req,res,function(){
     	 //res.redirect("/seller/"+req.params.id+"/show");
      Person.find({username : username},function(err,person){
   	 if(err){
   	 	console.log(err);
   	 }else{
        console.log(person);
      res.render("schemashow.ejs",{data : person});
   	 }
   });
     });
   });
});

app.get("/signup",function(req,res){
  res.render("signup.ejs");
});

app.get("/login",function(req,res){
  res.render("login.ejs");
});

app.listen("5000",function(req,res){
  console.log("server is started");
});  
