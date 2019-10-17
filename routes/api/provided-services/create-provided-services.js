// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();


router.post("/api/provided-services", function(req, res) {
	console.log(req.body);
	db.ProvidedServices.create(req.body)
	.then(function(dbProvidedServices) {
		res.json(dbProvidedServices);
	});
});

// Export these routers
module.exports = router;