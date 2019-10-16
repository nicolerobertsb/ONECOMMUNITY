// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('read-service-categories');


router.get("/api/services/categories", function(req, res) {
  db.ServiceCategories.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(dbServiceCategories) {
    res.json(dbServiceCategories);
  });
});

router.get("/api/services/categories/:id", function(req, res) {
  db.ServiceCategories.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(dbServiceCategory) {
    res.json(dbServiceCategory);
  });
});

// Export these routers
module.exports = router;