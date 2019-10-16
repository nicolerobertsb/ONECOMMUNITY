// Import necessary Node.js files
var express = require('express');
var db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

router.get('/provided-service/:id', function (req, res) {

    db.ProvidedServices.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(function (service) {

        // request.getUser()
        // .then(function (user) {

        // })
        res.render('provided-service', {
        });
    });
});

module.exports = router;