// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

function grabItems (isVolunteer, categoryId, serviceId, callback) {
    var itemType = (isVolunteer) ? 'volunteer' : 'request';
    var browseModel = (isVolunteer) ? db.ProvidedServices : db.Requests;

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
    else if (categoryId !== 0) {
        console.log(browseModel);
        findClause.where = {
            ServiceCategoryId: categoryId
        }
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
                startDate: row.start_date,
                endDate: row.end_date,
            }
        }));
    })
    .catch(err => console.log(err));
}

router.get('/api/browse', function (req, res) {
    // If we're pulling all volunteers and requests
    if (parseInt(req.query.activeItems) === 0) {
        grabItems(true, parseInt(req.query.category), parseInt(req.query.service), function (providedServices) {
            grabItems(false, parseInt(req.query.category), parseInt(req.query.service), function (requests) {
                var resultingItems = [
                    ...providedServices,
                    ...requests,
                ]
                res.json(resultingItems);
            });
        });
    }
    // If we're pulling only one
    else {
        var isVolunteer = (parseInt(req.query.activeItems) === 1);

        grabItems(isVolunteer, parseInt(req.query.category), parseInt(req.query.service), function (resultingItems) {
            res.json(resultingItems);
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