var express = require('express'),
  router = express.Router(),
  Article = require('../models/article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  // var articles = [new Article(), new Article()];
    res.render('homepage', {
      title: 'Generator-Express MVC',
      onLine: req.session.is_online, fullname: req.session.fullname
      // articles: articles
    });
});
