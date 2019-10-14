// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('read-browse');


router.get("/api/requests", function(req, res) {
    // 1. Add a join to include all of users
    db.Requests.findAll({}).then(function(dbRequest) {
      res.json(dbRequest);
    });
  });

  router.get("/api/requests/:id", function(req, res) {
    // 2; Add a join to include all of users
    db.Requests.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbRequest) {
      res.json(dbRequest);
    });
  });

// Export these routers
module.exports = router;