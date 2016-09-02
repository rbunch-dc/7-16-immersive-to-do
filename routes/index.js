var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var mongoUrl = "mongodb://localhost:27017/todo"
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

router.get('/todo', function(req, res, next) {
	db.collection('tasks').find().toArray(function(error, tasksResults){
		console.log(tasksResults);
  		res.render('todo', { tasksArray: tasksResults });
	});
});

router.post('/addNew', function(req, res, next) {
	//we know that the variable is newTaskString... becaues we made the ejs page.
	var newTask = req.body.newTaskString;
	var newDate = req.body.newTaskDate;
	db.collection('tasks').insertOne({
		taskName: newTask,
		taskDate: newDate
	});
	res.redirect('/todo');
});

router.get('/addNew', function(req, res, next) {
	res.send("I am a get request page!");
});

router.get('/remove', function(req, res, next){
	var idToDelete = new mongodb.ObjectID(req.query.id);
	db.collection('tasks').deleteOne({
		_id: idToDelete
	})
	res.redirect('/todo');
});

module.exports = router;
