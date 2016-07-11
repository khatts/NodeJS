var express    = require('express');        // call express

var http = require('http');
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3456;        // set our port


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3456
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

/**
 * Lets define our Model for User entity. This model represents a collection in the database.
 * We define the possible schema of User document and data types of each field.
 * */
//var pictureInfo = mongoose.model('picture_info', {gcmId: String, country: String, counter: Number ,default: 0});



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//middleware to use for all requests

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	console.log("handling api get call");
    res.json({ message: 'hooray! welcome to our api!' });   
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================

server.listen(server_port, server_ip_address, function () {
	  console.log( "Listening on " + server_ip_address + ", server_port " + port )
	});
//console.log("Listening on " + ip + ", server_port " + port)
console.log('Magic happens on port ' + server_port);


