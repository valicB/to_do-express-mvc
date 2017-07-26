// module - task logic
var express = require('express'),
    router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/create', (req, res)=>{
  res.render('create-task', {title: 'Create new task', onLine: req.session.is_online, fullname: req.session.fullname});
});
router.post('/task/new', (req, res)=>{
  res.redirect('/');
});
router.get('/tasks', (req, res)=>{
  res.render('all-tasks', {title: 'All tasks', onLine: req.session.is_online, fullname: req.session.fullname});
});
