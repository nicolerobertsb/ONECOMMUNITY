// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

function grabProvidedServices (serviceId, callback) {
    var findClause = {
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
        findClause.where = {
            ServiceId: serviceId
        };
    }

    db.ProvidedServices.findAll(findClause)
    .then(function (providedServices) {
        callback(providedServices);
    })
    .catch(err => console.log(err));
}

function grabRequests (serviceId, callback) {
    var findClause = {
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
        findClause.where = {
            ServiceId: serviceId
        };
    }

    db.Requests.findAll(findClause)
    .then(function (requests) {
        callback(requests);
    })
    .catch(err => console.log(err));
}

router.get('/api/browse', function (req, res) {
    // If we're pulling all volunteers and requests
    if (parseInt(req.query.activeItems) === 0) {
        grabProvidedServices(parseInt(req.query.service), function (providedServices) {
            grabRequests(parseInt(req.query.service), function (requests) {
                var rows;
                if (providedServices.length === 0) {
                    rows = requests.map(function (row) {
                        return {
                            id: row.id,
                            itemType: 'request',
                            isVolunteer: false,
                            userName: row.User.user_name,
                            category: row.Service.ServiceCategory.service_category_name,
                            service: row.Service.service_name,
                            startDate: row.start_date,
                            endDate: row.end_date,
                        }
                    });
                }
                else if (requests.length === 0) {
                    rows = providedServices.map(function (row) {
                        return {
                            id: row.id,
                            itemType: 'volunteer',
                            isVolunteer: true,
                            userName: row.User.user_name,
                            category: row.Service.ServiceCategory.service_category_name,
                            service: row.Service.service_name,
                            startDate: row.start_date,
                            endDate: row.end_date,
                        }
                    });
                }
                else {
                    rows = [];
                    while (providedServices.length !== 0) {
                        var providedService = providedServices.pop();
                        rows.push({
                            id: providedService.id,
                            itemType: 'volunteer',
                            isVolunteer: true,
                            userName: providedService.User.user_name,
                            category: providedService.Service.ServiceCategory.service_category_name,
                            service: providedService.Service.service_name,
                            startDate: providedService.start_date,
                            endDate: providedService.end_date,
                        });
                        while (requests.length !== 0) {
                            var request = requests.pop();
                            rows.push({
                                id: request.id,
                                itemType: 'request',
                                isVolunteer: false,
                                userName: request.User.user_name,
                                category: request.Service.ServiceCategory.service_category_name,
                                service: request.Service.service_name,
                                startDate: request.start_date,
                                endDate: request.end_date,
                            });
                        }
                    }
                }
                res.json(rows);
            });
        });
    }
    // If we're pulling only one
    else {
        var isVolunteer = (parseInt(req.query.activeItems) === 1);
        var itemType = (isVolunteer) ? 'volunteer' : 'request';
        var grabFunction = (isVolunteer) ? grabProvidedServices : grabRequests;

        grabFunction(parseInt(req.query.service), function (resultingItems) {
            var rows = resultingItems.map(function (row) {
                return {
                    id: row.id,
                    itemType: itemType,
                    isVolunteer: isVolunteer,
                    userName: row.User.user_name,
                    category: row.Service.ServiceCategory.service_category_name,
                    service: row.Service.service_name,
                    startDate: row.start_date,
                    endDate: row.end_date,
                }
            });
            res.json(rows);
        });
    }
    // var rows = [
    //     {id: 1, itemType:'volunteer', summary:'Nathan<br>Available for: Pet - Walking<br>Time: Oct 19, 7am-7pm'},
    //     {id: 1, itemType:'volunteer', summary:'Jason<br>Available for: Pet - Grooming<br>Time: Oct 20, 7am-3pm'},
    //     {id: 1, itemType:'request', summary:'Tanaka<br>Requesting: Delivery - Other<br>Time: Oct 20, 6pm-8pm'},
    //     {id: 1, itemType:'request', summary:'Miho<br>Requesting: Household - Yard Work<br>Time: Oct 21, 6am-2pm'},
    //     {id: 1, itemType:'volunteer', summary:'Mary<br>Available for: Professional - Taxes<br>Time: Oct 21, 6pm-9pm'},
    //     {id: 1, itemType:'request', summary:'Jerry<br>Requesting: Household - Plumbing<br>Time: Oct 21, 9pm-3am'},
    //     {id: 1, itemType:'volunteer', summary:'Ruby<br>Available for: Household - Home Repairs<br>Time: Oct 23, 4pm-8pm'},
    // ];
});

module.exports = router;