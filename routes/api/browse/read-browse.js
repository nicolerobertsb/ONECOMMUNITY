// Import necessary Node.js files
var express = require('express');
var moment = require('moment');
var db = require('../../../models');
const { Op } = require('sequelize');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

function grabItems (isVolunteer, categoryId, serviceId, orderBy, callback) {
    var itemType = (isVolunteer) ? 'volunteer' : 'request';
    var browseModel = (isVolunteer) ? db.ProvidedServices : db.Requests;

    var findClause = {
        where: {
            end_date: {
                [Op.gt]: new Date()
            }
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
            }
        ]
    };

    if (serviceId !== 0) {
        findClause.where.ServiceId = serviceId;
    }
    else if (categoryId !== 0) {
        findClause.where.ServiceCategoryId = categoryId;
    }

    if (orderBy === 0) {
        findClause.order = '"end_date" ASC';
    }

    browseModel.findAll(findClause)
    .then(function (rows) {
        callback(rows.map(function (row) {
            return {
                id: row.id,
                itemType: itemType,
                isVolunteer: isVolunteer,
                userName: row.User.user_name,
                category: row.Service.ServiceCategory.service_category_name,
                service: row.Service.service_name,
                startDate: moment(row.start_date).tz('America/Los_Angeles').format('MMM D, h:mma z'),
                endDate: moment(row.end_date).tz('America/Los_Angeles').format('MMM D, h:mma z'),
            }
        }));
    })
    .catch(err => console.log(err));
}

router.get('/api/browse', function (req, res) {
    // If we're pulling all volunteers and requests
    if (parseInt(req.query.activeItems) === 0) {
        grabItems(true, parseInt(req.query.category), parseInt(req.query.service), req.query.orderBy, function (providedServices) {
            grabItems(false, parseInt(req.query.category), parseInt(req.query.service), req.query.orderBy, function (requests) {
                var resultingItems = [
                    ...providedServices,
                    ...requests,
                ];

                resultingItems = resultingItems.sort(function (a, b) {
                    return moment(a.endDate, 'MMM D, h:mma z') > moment(b.endDate, 'MMM D, h:mma z');
                });

                res.json(resultingItems);
            });
        });
    }
    // If we're pulling only one
    else {
        var isVolunteer = (parseInt(req.query.activeItems) === 1);

        grabItems(isVolunteer, parseInt(req.query.category), parseInt(req.query.service), req.query.orderBy, function (resultingItems) {
            res.json(resultingItems);
        });
    }
});

module.exports = router;