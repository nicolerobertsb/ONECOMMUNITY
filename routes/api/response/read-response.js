// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('read-response');

router.get("/api/responses", function(req,res){
    //add a join to include all the responses
    db.Responses.findAll({}).then(function(dbResponse){
        res.json(dbResponse);
    });
});

router.get("/api/responses/:id", function(req, res){
    // add a join to include all of the responses
    db.Responses.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(dbResponse){
        res.json(dbResponse);
    });
});

// Export these routers
module.exports = router;