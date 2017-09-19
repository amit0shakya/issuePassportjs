var express = require('express');
	app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path =	require('path');
var bodyparser = require('body-parser');
var connectflash = require('connect-flash');
var cookie = require('cookie-parser');

app.engine('html',require('ejs').renderFile);
app.set('views',path.join(__dirname+"/views"))

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.get('/',function(req,res){
	res.render("index.html")
})


  app.use(require('cookie-parser')());
  app.use(require('express-session')({secret:'keyboard cat',resave:false,saveUninitialized:false}));
  app.use(passport.initialize());
  app.use(passport.session());


passport.use(new LocalStrategy(
  function(username, password, cb) {
    console.log(username+"<<username   password>>>>"+password);
    if(username=="amit" && password=="amit"){
      console.log('sucess login')
      return cb(null,{username:"amit",id:"007"})
    }else{
      console.log('fail login')
      return cb(null, false, { message: 'Incorrect username.' });
    }
}));

passport.serializeUser(function(user, cb) {
  console.log("serializeUser new local strategy");
  cb(null, 007);
});


passport.deserializeUser(function(id, cb) {
  console.log("deserialize User");
 /* db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });*/
    cb(null,{username:"amit",id:"007"});
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    console.log("C")
    res.redirect('/profile');
 });


app.get('/profile',function(req,res){
  //console.log(req.user,"profile page here")
  var msg="Hello "+req.user.username
  res.send(msg);
})

app.get('/otherpage',function(req,res){
  var msg="Welcome Mr. "+req.user.username
  res.send(msg);
})


app.listen(2000,function(){
	console.log("app running on 2000")
});