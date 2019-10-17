// Import necessary Node.js files
var express = require('express');
var db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

router.get("/logout", function(req, res) {
    req.session.destroy(function () {
        res.redirect('/');
    })
});

// Export these routers
module.exports = router;