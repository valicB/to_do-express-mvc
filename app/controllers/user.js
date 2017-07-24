//module - user logic
var express = require('express'),
    router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};


router.get('/login', (req, res)=>{
  res.render('login-page', {onLine: req.session.is_online, fullname: req.session.fullname});
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
        } else res.render('login-page', {error : 'Bad fullname or password'});
      }
  });
});

router.get('/register', (req, res)=>{
  res.render('register-page', {onLine: req.session.is_online, fullname: req.session.fullname});
});
router.get('/create', (req, res)=>{
  res.render('create-task', {onLine: req.session.is_online, fullname: req.session.fullname});
});
