// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('update-request');


router.put("/api/requests", function(req, res) {
    // Add sequelize code to find a single request where the id is equal to req.params.id,
    db.Requests.update({
      recipient_id: req.body.recipient_id,
      services_id: req.body.services_id,
      volunteer_id: req.body.volunteer_id,
      detail: req.body.volunteer_id,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(function(dbRequest) {
        res.json(dbRequest);
      });
    // return the result to the user with res.json
  });
  
// Export these routers
module.exports = router;