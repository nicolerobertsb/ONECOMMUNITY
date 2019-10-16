// Import necessary Node.js files
var express = require('express');
var db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

router.get('/user/:id', function (req, res) {

    db.Users.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    })
    .then(function (user) {
        user.getProvidedServices({
            include: [{
                model: db.Services,
                required: true, // Produces inner join on association
                include: [{
                    model: db.ServiceCategories,
                    required: true // Produces inner join on association
                }]
            }]
        })
        .then(function (serviceRows) {

            var services = serviceRows.map(function (row) {
                return {
                    provided_service_id: row.id,
                    service_name: row.Service.service_name,
                    category_name: row.Service.ServiceCategory.service_category_name
                }
            });

            user.getRequests({
                include: [{
                    model: db.Services,
                    required: true, //Produces inner join on association
                    include: [{
                        model: db.ServiceCategories,
                        required: true, //Produces inner join on association
                    }]
                }]
            })
            .then(function (requestRows) {

                var requests = requestRows.map(function (row) {
                    return {
                        request_id: row.id,
                        service_name: row.Service.service_name,
                        category_name: row.Service.ServiceCategory.service_category_name
                    }
                });

                user.getResponses({
                    include: [{
                        model: db.Requests,
                        required: true, //Produces inner join on association
                        include: [{
                            model: db.Services,
                            required: true, //Produces inner join on association
                            include: [{
                                model: db.ServiceCategories,
                                required: true, //Produces inner join on association
                            }]
                        }]
                    }]
                })
                .then(function (responseRows) {

                    var responses = responseRows.map(function (row) {
                        return {
                            request_id: row.Request.id,
                            service_name: row.Request.Service.service_name,
                            category_name: row.Request.Service.ServiceCategory.service_category_name
                        }
                    });

                    res.render('user', {
                        user_name: user.user_name,
                        email: user.email,
                        about_me: user.about_me,
                        homepage_url: user.homepage_url,
                        linkedin_url: user.linkedin_url,
                        twitter_url: user.twitter_url,
                        zipcode: user.zipcode,
                        rating: user.rating,
                        social_points: user.social_points,
                        historical_social_points: user.historical_social_points,
                        services: services,
                        requests: requests,
                        responses: responses
                    });
                });
            })
        });
    });
});

// Export these routers
module.exports = router;