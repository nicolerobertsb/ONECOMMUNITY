// Import necessary Node.js files
var express = require('express');
var db = require('../../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();

router.get("/api/users", function(req, res) {
	db.Users.findAll({}).then(function(dbUser) {
		res.json(dbUser);
	});
});

router.get("/api/users/:id", function(req, res) {
	db.Users.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(dbUser) {
		res.json(dbUser);
	});
});

// router.get('/api/users/:id/services', function (req, res) {
// 	db.ProvidedServices.findAll({
// 		where: {
// 			UserId: req.params.id
// 		}
// 	})
// 	.then(function (dbProvidedServices) {
// 		res.json(dbProvidedServices);
// 	})
// });

// Export these routers
module.exports = router;