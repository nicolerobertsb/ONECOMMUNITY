// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();


router.get("/api/provided-services", function(req, res) {
	db.ProvidedServices.findAll()
	.then(function(dbProvidedServices) {
		res.json(dbProvidedServices);
	});
});

router.get("/api/provided-services/:id", function(req, res) {
	db.ProvidedServices.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(dbProvidedService) {
		res.json(dbProvidedService);
	});
});

// Export these routers
module.exports = router;