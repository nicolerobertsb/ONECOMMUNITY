// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('update-user');

router.put("/api/users", function(req, res) {
    // Add sequelize code to find a single post where the id is equal to req.params.id,
    db.Users.update({
      user_name: req.body.user_name,
      email: req.body.email,
      about_me: req.body.about_me,
      homepage_url: req.body.homepage_url,
      linkedin_url: req.body.linkedin_url,
      twitter_url: req.body.twitter_url,
      zipcode: req.body.zipcode
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
  router.put("/api/users/password", function(req, res) {
    db.Users.update({
      password: req.body.password
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });
  router.put("/api/users/rating", function(req, res) {
    db.Users.update({
      user_rating: req.body.user_rating
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });


// Export these routers
module.exports = router;