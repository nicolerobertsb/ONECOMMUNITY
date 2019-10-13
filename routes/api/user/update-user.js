// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('update-user');

app.get("/api/users/:id", function(req, res) {
    // Add sequelize code to find a single post where the id is equal to req.params.id,
    db.User.update({
      user_name: req.body.user_name,
      email: req.body.email,
      about_me: req.body.about,
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(function(dbUser) {
        res.json(dbUser);
      });
    // return the result to the user with res.json
  });


// Export these routers
module.exports = router;