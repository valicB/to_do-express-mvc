//module - user logic
var express = require('express'),
    router = express.Router();

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
