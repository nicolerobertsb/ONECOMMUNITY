// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

console.log('read-request');
router.get("/api/requests", function(req,res){
    //add a join to include all the requests
    db.Requests.findAll({}).then(function(dbRequest){
        res.json(dbRequest);
    });
});

router.get("/api/requests/:id", function(req, res){
    // add a join to include all of the requests
    db.Requests.findOne({
        where: {
            id: parseInt(req.params.id)
        },
        include: [
            {
                model: db.Users,
                required: true
            },
            {
                model: db.Services,
                required: true,
                include: [
                    {
                        model: db.ServiceCategories,
                        required: true
                    }
                ]
            },
        ]
    }).then(function(dbRequest){
        res.json(dbRequest);
    });
});

// Export these routers
module.exports = router;