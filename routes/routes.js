const express = require('express');
const bodyParser = require('body-parser');
const models = require('../models');

const Router = express.Router();

Router.use(bodyParser.urlencoded({extended: true}));

// models.Post.findOne().then(function(users){
//   console.log(users);
// });


var sess;

Router.get('/', function(req, res){
  sess = req.session;
  if (sess.username) {
    res.redirect('/profile');
  } else {
      res.render('signup');
  }
});

Router.get('/signup', function(req, res){
  sess =req.session;
  if (sess.username) {
    res.redirect('/profile');
  } else {
    res.render('signup');
  }
});

Router.post('/signup', function(req, res){
    sess = req.session;
    sess.username = req.body.username;
    sess.password = req.body.password;
    models.Users.create({
    username: sess.username,
    password: sess.password,
    email: req.body.email,
    loggedin: true
  }).then(function(){
    res.redirect('/profile');
  });
});


Router.get('/signin', function(req, res){
  sess = req.session;
  if (sess.username) {
    res.redirect('/profile');
  } else {
    res.render('signin');
  }
});

Router.post('/signin', function(req, res){
  sess = req.session;
  sess.username = req.body.username;
  sess.password = req.body.password;
  models.Users.update({
    loggedin: true,
  }, {
    where: {
      username: sess.username,
      password: sess.password
    }
  }).then(function(){
    res.redirect('/profile');
  });
});


Router.get('/profile', function(req, res){
  sess = req.session;
  if (sess.password) {
    res.render('profile', {
      username: sess.username,
    });
  } else {
    res.redirect('/signup');
  }
});


Router.get('/logout',function(req,res){
  models.Users.update({
    loggedin: false,
  }, {
    where: {
      username: sess.username,
      password: sess.password,
    }
  }).then(function(){
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });

  });

});
module.exports = Router;