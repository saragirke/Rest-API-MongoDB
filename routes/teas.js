var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
router.use(
    bodyParser.urlencoded({
      extended: true
    })
)
router.use(bodyParser.json());

/********************************************* 
 * Initialize database and connection
 *********************************************/
var mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/tea', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise; // Global use of mongoose

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) { // Add the listener for db events 
    console.log("Connected to db");

    // Create DB scheme 
    var teaSchema = mongoose.Schema({
        name: String,
        type: String,
		price: String,
		amount: String
    });

    // Create scheme model
    var Tea = mongoose.model('Tea', teaSchema )


/********************************************* 
 * Get complete tea listing
 *********************************************/
router.get('/', function(req, res, next) {

  // Läs ut från databasen
  Tea.find(function(err, teas) {
    if(err) return console.error(err);  
    var jsonObj = JSON.stringify(teas);
	res.contentType('application/json');
    res.send(jsonObj);
  });
});

/*****************************************
  GET tea by id
 ****************************************/
router.get('/:id', function(req, res, next) {

    var id = req.params.id;
    var ind = -1;

    Tea.find(function(err, teas) {
        if(err) return console.error(err);
    for(var i=0; i < teas.length; i++){
        if(teas[i]._id == id) ind = i; 
    } 
    console.log(teas[ind]);
    res.contentType('application/json');
    res.send(ind>=0?teas[ind]:'{}'); 
});
});



/********************************************* 
 * Add new tea
 *********************************************/
 router.post('/', function(req, res, next) {
    // Create a new user
    var tea1 = new Tea({ 
        name: req.body.name, 
        type: req.body.type,
        price: req.body.price,
        amount: req.body.amount,
    

    });	
console.log("test" + req.body.name);

    // Save new user to db
    tea1.save(function(err) {
        if(err) return console.error(err);
    });

	var jsonObj = JSON.stringify(tea1);
	res.contentType('application/json');
	res.send(jsonObj);

});

/********************************************* 
 * Update tea
 *********************************************/
 router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    // Create a new user
    var tea2 = new Tea({ 
        id: req.body.id,
        name: req.body.name, 
        type: req.body.type,
        price: req.body.price,
        amount: req.body.amount,

    });	
console.log("test" + req.body.name);

    // Save new user to db
    tea2.save(function(err) {
        if(err) return console.error(err);
    });

	var jsonObj = JSON.stringify(tea2);
	res.contentType('application/json');
	res.send(jsonObj);

});


/************************************
 Delete tea by id
 ************************************/
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

// Raderar kurs med _id från databas
Tea.deleteOne({ "_id": id }, function (err) {
    if (err) return handleError(err);
});
// Hämtar listan av kurser
Tea.find(function(err, teas) {
    if(err) return console.error(err);

    var jsonObj = JSON.stringify(teas);
    res.contentType('application/json');
    res.send(jsonObj);
});
});

}); // DB connection

module.exports = router;





