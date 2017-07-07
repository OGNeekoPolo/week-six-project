const express = require('express');
const bodyParser = require('body-parser');
const models = require('../models');

const Router = express.Router();

Router.use(bodyParser.urlencoded({extended: true}));


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
  sess = req.session;
  if (sess.username) {
    res.redirect('/profile');
  } else {
    res.render('signup');
  }
});

Router.post('/signup', function(req, res){
    models.Users.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    loggedin: true
  }).then(function(newUser){
    sess = req.session;
    sess.username = newUser.username;
    sess.password = newUser.password;
    sess.number = newUser.id;
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
  models.Users.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then(function(user){
    sess = req.session;
    sess.username = user.username;
    sess.number = user.id;
    sess.password = user.password;
    res.redirect('/profile');
  }).catch(function(error){
    error.message = 'Invalid name or password';
    res.send(error.message);
  });
});


Router.get('/profile', function(req, res){
  sess = req.session;
  if (sess.password) {
    models.Post.findAll({
      where: {
        userid: sess.number
      }
    }).then(function(posts){
      res.render('profile', {
        username: sess.username,
        posts: posts
      });
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
  sess = req.session;
  models.Post.findAll().then(function(allPosts){
    res.render('post', {
      username: sess.username,
      allPosts: allPosts
    });
  });
});

Router.post('/post', function(req, res){
  sess = req.session;
  models.Post.create({
    title: req.body.title,
    body: req.body.body,
    userid: sess.number,
  }).then(function(){
    res.redirect('/post');
  });
});

Router.post('/delete', function(req, res){
  models.Like.destroy({
    where: {
      postid: req.body.delete
    }
  }).then(function(){
    models.Post.destroy({
      where: {
        id: req.body.delete
      }
    });
  }).then(function(){
    res.redirect('/post');
  });
});

Router.post('/profileDelete', function(req, res){
  models.Like.destroy({
    where: {
      postid: req.body.delete
    }
  }).then(function(){
    models.Post.destroy({
      where: {
        id: req.body.delete
      }
    });
  }).then(function(){
    res.redirect('/profile');
  });
});

Router.post('/like', function(req, res){
  models.Like.create({
    userid: req.session.number,
    postid: req.body.like
  }).then(function(newLike){
    console.log(newLike);
    res.redirect('/post');
  });
});


module.exports = Router;
