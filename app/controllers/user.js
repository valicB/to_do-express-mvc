//module - user logic
var express = require('express'),
    router = express.Router();
var User = require('../models/user');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/todo_test';
var assert = require('assert');

module.exports = function (app) {
  app.use('/', router);
};


router.get('/login', (req, res)=>{
  res.render('login-page', {title: 'Authentication', onLine: req.session.is_online, fullname: req.session.fullname});
});

router.post('/user/login', (req, res)=>{
  var fullname  = req.body.fullname;
  var email     = req.body.email;
  var password  = req.body.password;

  req.assert('fullname', 'Fullname is required').notEmpty();
  req.assert('password', '6 to 20 characters required').len(6, 20);

  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.render('login-page', {error : result.array()[0].msg});
    } else {
        if (
          fullname == "admin" && password == "1234567" ||
          fullname == "admin1" && password == "1234567"
      ){
          req.session.is_online = true;
          req.session.fullname = fullname;
          res.redirect('/');
        } else res.render('login-page', {title: 'Authentication', error : 'Bad fullname or password'});
      }
  });
});
router.get('/user/logout', (req, res)=>{
  // res.session = null;
  req.session.is_online = null
  res.redirect('/');
});

router.get('/register', (req, res)=>{
  res.render('register-page', {title: 'Registration', onLine: req.session.is_online, fullname: req.session.fullname});
});


router.post('/user/create', (req, res)=>{
  var fullname  = req.body.fullname;
  var email     = req.body.email;
  var password  = req.body.password;
  // var cpassword = req.body.cpassword;

  req.assert('fullname', 'Fullname is required').notEmpty();
  req.assert('email', 'Email is required').notEmpty();
  req.assert('email', 'Invalid email').isEmail();
  req.assert('password', '6 to 20 characters required').len(6, 20);
  req.assert('cpassword', 'Passwords must match').equals(req.body.password);

  req.getValidationResult().then(function(result) {

    // console.log(result.isEmpty());
    if (!result.isEmpty()) {
      // console.log(result.array()[0].param);
      // console.log(result.array()[0].msg);
      res.render('register-page', {error : result.array()[0].msg});
    } else{
      ///
      // var fullname = 'Test user';
      // var password = '1234567';
      // var email = 'test@mail.com';

      //create a new user object
      var user = new User( { fullname: fullname, password: password, email: email } );

      //CONNECT
      MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        // CHOOSE COLLECTION
        var collection = db.collection('users');
        collection.insert(user, (err, result)=>{
          assert.equal(err, null, "User register");
          db.close();
          res.json(user);
        });

      });
    }

  });
});

router.get('/user/test', (req, res)=>{

  var fullname = 'Test user';
  var password = '1234567';
  var email = 'test@mail.com';

  //create a new user object
  var user = new User( { fullname: fullname, password: password, email: email } );

  //CONNECT
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    // CHOOSE COLLECTION
    var collection = db.collection('users');
    collection.insert(user, (err, result)=>{
      assert.equal(err, null, "User register");
      db.close();
      res.json(user);
    });

  });

});
