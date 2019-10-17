// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('update-request');


router.put("/api/requests", function(req, res) {
    // Add sequelize code to find a single request where the id is equal to req.params.id,
    db.Requests.update({
      detail: req.body.detail,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      address: req.body.address,
      hide_address: req.body.hide_address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    }, {
      where: {
        id: parseInt(req.body.id)
      }
    })
      .then(function(dbRequest) {
        res.json(dbRequest);
      });
    // return the result to the user with res.json
  });
  
// Export these routers
module.exports = router;