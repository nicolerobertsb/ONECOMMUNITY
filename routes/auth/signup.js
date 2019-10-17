// Import necessary Node.js files
var express = require('express');
var db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

router.post("/auth/signup", function(req, res) {
    console.log(req.body);
    db.Users.create(req.body)
    .then(function (newUser) {
        console.log(newUser);
        res.json(newUser);
    });
});

// Export these routers
module.exports = router;