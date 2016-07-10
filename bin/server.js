var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('localhost:27017/selfie'); // connect to our database

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

/**
 * Lets define our Model for User entity. This model represents a collection in the database.
 * We define the possible schema of User document and data types of each field.
 * */
var pictureInfo = mongoose.model('picture_info', {gcmId: String, country: String, counter: Number ,default: 0});



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	console.log("handling api get call");
    res.json({ message: 'hooray! welcome to our api!' });   
});

//on routes that end in /bears
//----------------------------------------------------
router.route('/bears')

 // create a bear (accessed at POST http://localhost:8080/api/bears)
 .post(function(req, res) {
     
     var info = new pictureInfo();      // create a new instance of the Bear model
     info.gcmId = req.body.gcmId;  // set the bears name (comes from the request)
     info.country = req.body.country;
     info.counter= req.body.counter;
     var unique_id = req.body.uniqueId;
     if(unique_id==null){
    	 console.log("No unique id is present in a request, new user has come in");
    	// save the user and check for errors
         info.save(function(err) {
             if (err)
                 res.send(err);

             
         });
     }else{
    	 console.log("Unique Id is presnt , updated an old user with the latest information");
    	 pictureInfo.findOne({_id: unique_id}, function (err, userObj) {
    		  if (err) {
    		    console.log(err);
    		  } else if (userObj) {
    		    console.log('Found:', userObj);

    		    //For demo purposes lets update the user on condition.
    		      userObj.counter += Number(info.counter);
    		      userObj.gcmId=info.gcmId;

    		      //Lets save it
    		      userObj.save(function (err) {
    		        if (err) {
    		          console.log(err);
    		        } else {
    		          console.log('Updated', userObj);
    		        }
    		      });
    		    
    		  } else {
    		    console.log('User not found!');
    		  }
    		});
     }res.json({ message: info._id });

     
     
 });



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Listening on " + server_ip_address + ", server_port " + server_port)
console.log('Magic happens on port ' + port);


//Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/selfie');
