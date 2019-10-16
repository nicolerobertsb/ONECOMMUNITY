// Import necessary Node.js files
var express = require('express');
var db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

router.get('/request/:id', function (req, res) {

    db.Requests.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(function (request) {

        // request.getUser()
        // .then(function (user) {

        // })
        res.render('request', {
            detail: request.detail,
            hide_address: request.hide_address,
            address: request.address,
            city: request.city,
            state: request.state,
            zipcode: request.zipcode,
            requester_rating: request.requester_rating,
            bounty_points: request.bounty_points,
            start_date: request.start_date,
            end_date: request.end_date,
            user: user,
            service: service,
            responses: responses
        });
    });
});

// Export these routers
module.exports = router;