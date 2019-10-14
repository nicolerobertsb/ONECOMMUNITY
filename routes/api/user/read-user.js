// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('read-user');
router.get("/api/users", function(req, res) {
    // 1. Add a join to include all of users
    db.Users.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  router.get("/api/users/:id", function(req, res) {
    // 2; Add a join to include all of users
    db.Users.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

// Export these routers
module.exports = router;