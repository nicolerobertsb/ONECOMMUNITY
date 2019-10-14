// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('read-services');


router.get("/api/services", function(req, res) {
    // 1. Add a join to include all of users
    db.Services.findAll({}).then(function(dbService) {
      res.json(dbService);
    });
  });

  router.get("/api/services/:id", function(req, res) {
    // 2; Add a join to include all of users
    db.Services.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbService) {
      res.json(dbService);
    });
  });

// Export these routers
module.exports = router;