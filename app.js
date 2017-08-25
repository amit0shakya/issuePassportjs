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



passport.use(new LocalStrategy(
  function(username, password, cb) {
    console.log("new local strategy");
/*    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });*/
  }));

passport.serializeUser(function(user, cb) {
  console.log("serializeUser new local strategy");
  //cb(null, user.id);
});


passport.deserializeUser(function(id, cb) {
  console.log("deserialize User");
 /* db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });*/
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("C")
    res.redirect('/');
  });
  

app.listen(2000,function(){
	console.log("app running on 2000")
});