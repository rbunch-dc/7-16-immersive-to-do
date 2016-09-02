var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var mongoUrl = "mongodb://localhost:27017/movies"
var db;
mongoClient.connect(mongoUrl, function(error, database){
	// console.log(database);
	// console.log(error);
	db = database;
});


/* GET home page. */
router.get('/', function(req, res, next) {

	db.collection('movie').find({name:"superman"}).toArray(function(error, movieResult){
		console.log(error);
		console.log(movieResult);
  		res.render('index', { movies: movieResult });
	});

});

module.exports = router;
