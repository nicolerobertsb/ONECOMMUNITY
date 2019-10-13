// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('volunteer-search');


app.get("/api/volunteers", function(req, res) {
    // 1. Add a join to include all of users
    db.User.findAll({}).then(function(dbVolunteer) {
      res.json(dbVolunteer);
    });
  });

  app.get("/api/volunteers/:id", function(req, res) {
    // 2; Add a join to include all of users
    db.Author.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbVolunteer) {
      res.json(dbVolunteer);
    });
  });

// Export these routers
module.exports = router;