// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

router.get('/api/browse', function (req, res) {

    var rows = [
        {itemType:'volunteer', summary:'Nathan<br>Available for: Pet - Walking<br>Time: Oct 19, 7am-7pm'},
        {itemType:'volunteer', summary:'Jason<br>Available for: Pet - Grooming<br>Time: Oct 20, 7am-3pm'},
        {itemType:'request', summary:'Tanaka<br>Requesting: Delivery - Other<br>Time: Oct 20, 6pm-8pm'},
        {itemType:'request', summary:'Miho<br>Requesting: Household - Yard Work<br>Time: Oct 21, 6am-2pm'},
        {itemType:'volunteer', summary:'Mary<br>Available for: Professional - Taxes<br>Time: Oct 21, 6pm-9pm'},
        {itemType:'request', summary:'Jerry<br>Requesting: Household - Plumbing<br>Time: Oct 21, 9pm-3am'},
        {itemType:'volunteer', summary:'Ruby<br>Available for: Household - Home Repairs<br>Time: Oct 23, 4pm-8pm'},
    ];

    res.json(rows);
});

module.exports = router;