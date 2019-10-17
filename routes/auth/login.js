// Import necessary Node.js files
var express = require('express');
var bcrypt = require('bcrypt');
var db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

router.post("/auth/login", function(req, res) {
    db.Users.findOne({
        where: {
            email: req.body.email,
        }
    })
    .then(function (dbUser) {
        if (bcrypt.compareSync(req.body.password, dbUser.password)) {
            req.session.user = dbUser;
        }
        else {
            req.session.user = false;
            req.session.error = "Authorization Failure";
        }
        res.json(req.session);
    });
});

// Export these routers
module.exports = router;