var express = require('express');
var handlebars = require('express-handlebars');
var routes = require('./routes');

// Requiring our models for syncing
var db = require("./models");

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up the view engine of Express to use Handlebars
app.engine("handlebars", handlebars({
    defaultLayout: 'main',
    helpers: {
        partial: function (name) {
            return name;
        }
    }
}));
app.set("view engine", "handlebars");

// Set up Express to use our external routes
app.use(routes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }) // Drop all data, and Recreate the tables
// db.sequelize.sync() // Keep all data, and Initialize the tables
.then(function() {
    // Start our server so that it can begin listening to client requests.
    app.listen(PORT, function () {
        // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
    });
});
