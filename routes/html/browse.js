// Import necessary Node.js files
var express = require('express');
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

var gatherCategories = function (selectedIndex) {

    var categories = [
        {val:0, text:'All', selected:(selectedIndex === 0), disabled:false},
        ...(
            [
                {id:1, service_category_name:'Pet'},
                {id:2, service_category_name:'Delivery'},
                {id:3, service_category_name:'Household'},
                {id:4, service_category_name:'Professional'},
                {id:5, service_category_name:'Community Events'},
                {id:6, service_category_name:'Other'},
            ].map(function (row) {
                return {
                    val: row.id,
                    text: row.service_category_name,
                    selected: (selectedIndex === row.id),
                    disabled: false
                };
            })
        )
    ];

    return categories;
}

var gatherServices = function (categoryId, selectedServiceId) {

    var services = function (categoryId) {
        switch (categoryId) {
            case 0: return [
                {id:0, service_name:'All'},
            ];
            case 1: return [
                {id:0, service_name:'All'},
                {id:1, service_name:'Grooming'},
                {id:2, service_name:'Walking'},
                {id:3, service_name:'Playdate'},
                {id:4, service_name:'Boarding'},
                {id:5, service_name:'Sitting'},
                {id:6, service_name:'Other'},
            ];
            case 2: return [
                {id:0, service_name:'All'},
                {id:7, service_name:'Meal'},
                {id:8, service_name:'Groceries'},
                {id:9, service_name:'Other'},
            ];
            case 3: return [
                {id:0, service_name:'All'},
                {id:10, service_name:'Cleaning'},
                {id:11, service_name:'Moving'},
                {id:12, service_name:'Unpacking'},
                {id:13, service_name:'Furniture Assembly'},
                {id:14, service_name:'Mounting'},
                {id:15, service_name:'Home Repairs'},
                {id:16, service_name:'Plumbing'},
                {id:17, service_name:'Painting'},
                {id:18, service_name:'Yard Work'},
                {id:19, service_name:'Installation'},
                {id:20, service_name:'Other'},
            ];
            case 4: return [
                {id:0, service_name:'All'},
                {id:21, service_name:'Taxes'},
                {id:22, service_name:'Finances'},
                {id:23, service_name:'Budgeting'},
                {id:24, service_name:'Tutoring'},
                {id:25, service_name:'Other'},
            ];
            case 5: return [
                {id:0, service_name:'All'},
                {id:26, service_name:'Soup Kitchen'},
                {id:27, service_name:'Food Bank'},
                {id:28, service_name:'Public Health'},
                {id:29, service_name:'Other'},
            ];
            case 6: return [
                {id:30, service_name:'Other'},
            ];
        }
    };

    return services(categoryId).map(function (row) {
        return {
            val: row.id,
            text: row.service_name,
            selected: (row.id === selectedServiceId),
            disabled: false,
        }
    });
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

    if (!req.body.hasOwnProperty('activeItems')) req.body.activeItems = 0;
    if (!req.body.hasOwnProperty('category')) req.body.category = 0;
    if (!req.body.hasOwnProperty('service')) req.body.service = 0;
        if (!req.body.hasOwnProperty('orderBy')) req.body.service = 0;

    var rows = [
        {itemType:'volunteer', summary:'Nathan<br>Available for: Pet - Walking<br>Time: Oct 19, 7am-7pm'},
        {itemType:'volunteer', summary:'Jason<br>Available for: Pet - Grooming<br>Time: Oct 20, 7am-3pm'},
        {itemType:'request', summary:'Tanaka<br>Requesting: Delivery - Other<br>Time: Oct 20, 6pm-8pm'},
        {itemType:'request', summary:'Miho<br>Requesting: Household - Yard Work<br>Time: Oct 21, 6am-2pm'},
        {itemType:'volunteer', summary:'Mary<br>Available for: Professional - Taxes<br>Time: Oct 21, 6pm-9pm'},
        {itemType:'request', summary:'Jerry<br>Requesting: Household - Plumbing<br>Time: Oct 21, 9pm-3am'},
        {itemType:'volunteer', summary:'Ruby<br>Available for: Household - Home Repairs<br>Time: Oct 23, 4pm-8pm'},
    ];

    res.render('browse', {
        
        browseResults: rows,
        activeItems: gatherActiveItems(req.body.activeItems),
        categories: gatherCategories(req.body.category),
        services: gatherServices(req.body.category, req.body.service),
        orderBy: gatherOrderingOptions(req.body.orderBy),
        importedCss: [
            'imported_css/materialize-icons'
        ],
        importedScripts: [
            'imported_scripts/moment'
        ],
        scripts: [
            'scripts/materialize-select',
            'scripts/browse-submit'
        ]
    });
});

// Export these routers
module.exports = router;