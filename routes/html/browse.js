// Import necessary Node.js files
var express = require('express');
var axios = require('axios');
var path = require('path');
var db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

var gatherActiveItems = function (selectedIndex) {

    var activeItems = [
        {val:0, text:'All', selected:(selectedIndex === 0), disabled:false},
        {val:1, text:'Volunteers', selected:(selectedIndex === 1), disabled:false},
        {val:2, text:'Requests', selected:(selectedIndex === 2), disabled:false},
    ];

    return activeItems;
};

var gatherOrderingOptions = function (selectedIndex) {

    var orderingOptions = [
        {val:0, text:'Date', selected:(selectedIndex === 0), disabled:false},
        {val:1, text:'Relevance', selected:(selectedIndex === 1), disabled:false},
        {val:2, text:'Rating', selected:(selectedIndex === 2), disabled:false},
        {val:3, text:'Distance [< 5 mi]', selected:(selectedIndex === 3), disabled:false},
        {val:4, text:'Distance [< 25 mi]', selected:(selectedIndex === 4), disabled:false},
        {val:5, text:'Distance [< 50 mi]', selected:(selectedIndex === 5), disabled:false},
        {val:6, text:'Distance [>= 50 mi]', selected:(selectedIndex === 6), disabled:false},
    ];

    return orderingOptions;
};

router.get('/browse', function (req, res) {

    var activeItems = req.query.activeItems || 0;
    var category = req.query.category || 0;
    var service = req.query.service || 0;
    var orderBy = req.query.orderBy || 0;

    axios.get(`http://${req.headers.host}/api/browse`, {
        params: {
            activeItems: activeItems,
            category: category,
            service: service,
            orderBy: orderBy,
        }
    })
    .then(function (browseResults) {

        axios.get(`http://${req.headers.host}/api/service-categories`)
        .then(function (serviceCategoryResults) {
            var serviceCategories = [
                {val:0, text:'All', selected:(category === 0), disabled:false},
                ...(serviceCategoryResults.data.map(function (row) {
                    return {
                        val: row.id,
                        text: row.service_category_name,
                        selected: (row.id === category),
                        disabled: false,
                    }
                }))
            ];

            axios.get(`http://${req.headers.host}/api/services`)
            .then(function (serviceResults) {
                var servicesByCategory = {
                    0: [{val:0, text:'All', selected:(service === 0), disabled:false}]
                };
                serviceResults.data.forEach(function (row) {

                    if (!servicesByCategory.hasOwnProperty(row.ServiceCategoryId)) {
                        servicesByCategory[row.ServiceCategoryId] = [];
                        servicesByCategory[row.ServiceCategoryId].push({val:0, text:'All', selected:(service === 0), disabled:false});
                    }
                    servicesByCategory[row.ServiceCategoryId].push({
                        val: row.id,
                        text: row.service_name,
                        selected: (row.id === service),
                        disabled: false,
                    })
                });

                res.render('browse', {
                    session_user: req.session.user || false,
                    activeItems: gatherActiveItems(activeItems),
                    orderBy: gatherOrderingOptions(orderBy),
                    categories: serviceCategories,
                    services: servicesByCategory[category],
                    browseResults: browseResults.data,
                    importedCss: [
                        {
                            partial: 'imported_css/materialize-icons',
                        },
                    ],
                    importedScripts: [
                        // {
                        //     partial: 'imported_scripts/moment',
                        // },
                    ],
                    scripts: [
                        {
                            partial: 'scripts/materialize-select',
                        },
                        {
                            partial: 'scripts/browse-submit',
                        },
                        {
                            partial: 'scripts/services-select-update',
                            categorySelector: '#categories',
                            serviceSelector: '#services',
                            categories: servicesByCategory
                        },
                    ]
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
});

// Export these routers
module.exports = router;