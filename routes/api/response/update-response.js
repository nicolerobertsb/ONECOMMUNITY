// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('update-response');

router.put("/api/responses", function(req, res){
    db.Responses.update({
        start_date: req.body.start_date,
        end_date: req.body.end_date,
    },{
        where:{
            id: parseInt(req.body.id)
        }
    })
    .then(function(dbResponse){
        res.json(dbResponse);
    });
});

// Export these routers
module.exports = router;