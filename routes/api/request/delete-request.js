// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('delete-request');

router.delete("api/requests/:id", function(req, res){
    db.Requests.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(dbRequest){
        res.json(dbRequest);
    });
});

// Export these routers
module.exports = router;