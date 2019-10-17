// Import necessary Node.js files
var express = require('express');
var db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
var router = express.Router();
console.log("aboutRoute")


router.get('/About', function (req, res) {

  res.render('about', {
    session_user: req.session.user || false,

    // importedCss: [
    //     'imported_css/materialize-icons'
    // ],
    // importedScripts: [
    //     'imported_scripts/moment'
    // ],
    // scripts: [
    //     'scripts/materialize-select',
    //     'scripts/browse-submit'
    // ]
  });
});

// Export these routers
module.exports = router;