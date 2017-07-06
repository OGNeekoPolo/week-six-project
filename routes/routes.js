const express = require('express');
const bodyParser = require('body-parser');
const models = require('../models');

const Router = express.Router();

Router.use(bodyParser.urlencoded({extended: true}));

// const users = models.Users.build({
//   username: 'Mercenary7824',
//   email: 'nikolas@theironyard.com',
//   password: 'test',
//   loggedin: false
// });
//
// users.save().then(function(newUser){
//   console.log(newUser);
// }).catch(function(error){
//   error.message = 'Your password is too short dummy!!';
//   console.log(error.message);
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
  }).then(function(newUser){
    res.redirect('/profile');
  }).catch(function(error){
    res.send(error.message);
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


Router.get('/post', function(req, res){
  res.render('post');
});


module.exports = Router;
