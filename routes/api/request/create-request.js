// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('create-request');

router.post("/api/requests", function (req, res){
    db.Requests.create(req.body).then(function(dbRequest){
        res.json(dbRequest);
    });
});

// Export these routers
module.exports = router;