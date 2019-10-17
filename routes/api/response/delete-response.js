// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('delete-response');

router.post("/api/responses/:id", function (req, res){
    db.Responses.destroy({
        where:{
            id: parseInt(req.params.id)
        }
    }).then(function(dbResponse){
        res.json(dbResponse);
    });
});
// Export these routers
module.exports = router;