var mongoose = require('mongoose');
var users = require('../controllers/users.js');
var lists = require('../controllers/lists.js');


module.exports = function(app){

	app.post('/login', function(req, res) {
		users.login(req, res);
	});

	app.post('/list', function(req, res) {
		lists.create(req, res);
	});

	app.post('/list/:id', function(req, res) {
		lists.update(req, res);
	});

	app.get('/main/:id', function(req, res){
		users.index(req, res);
	});

	app.get('/users/:id', function(req, res){
		users.show(req, res);
	});
}