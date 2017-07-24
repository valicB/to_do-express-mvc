// module - task logic
var express = require('express'),
    router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/tasks', (req, res)=>{
  res.render('login-page');
});
