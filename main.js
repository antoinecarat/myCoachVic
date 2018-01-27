const express = require('express');
const path = require('path')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

const hostname = '127.0.0.1';
const port = 3000;
const dbURI = 'mongodb://localhost/test';


mongoose.connect(dbURI, { useMongoClient: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Succesfully connected to %s", dbURI);
});

var userSchema = mongoose.Schema({
		name: String,
		age: Number,
		size: Number,
		weight: Number,
		sports: [String],
		admin: Boolean
});

var sportSchema = mongoose.Schema({
		name: String,
		metrics: [String]
});

var metricSchema = mongoose.Schema({
		name: String,
		type: String
});

var entrySchema = mongoose.Schema({
		user: String,
		sport: String,
		values: [{metric: String, value: String}]
});

var User = mongoose.model('User', userSchema);
var Sport = mongoose.model('Sport', sportSchema);
var Metric = mongoose.model('Metric', metricSchema);
var Entry = mongoose.model('Entry', entrySchema);

// var me = new User({name: 'acarat', age: 22, size: 170, weight: 65, sports: []})
// me.save(function (err, me) {
// 	if (err) return console.error(err);
// 	else console.log(me);
// });

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
	res.sendFile('index.html', {root: path.join(__dirname, '/site')});
});

app.get('/app.js', function (req, res) {
	res.sendFile('app.js', {root: path.join(__dirname, '/site/js')});
});

app.get('/listUsers', function (req, res) {
	var query = User.find().
	exec(function (err, users) {
  	if (err) return console.error(err);
  	else res.send(users);
	});
});

app.get('/getUser/:name', function (req, res) {
	var query = User.findOne().
	where('name').equals(req.params.name).
	exec(function (err, user) {
  	if (err) return console.error(err);
  	else res.send(user);
	});
});

app.post('/addUser', upload.array(), function (req, res) {
	var p = req.params;
	console.log(JSON.stringify(p));
	var user = new User({name: p.name, age: p.age, size: p.size, weight: p.weight, sports: p.sports, admin: p.admin });
	user.save(function (err, user) {
		if (err) return console.error(err);
		else res.send(user.name + " has been added.");
	});
});


// app.get('/listGet', function (req, res) {
// 	res.redirect("/");
// });
//
// app.post('/', function (req, res) {
// 	res.send("POST !");
// });
//
// app.put('/', function (req, res) {
// 	res.send("PUT");
// });
//
// app.delete('/', function (req, res) {
// 	res.send("DELETE");
// });

var server = app.listen(port, hostname, function () {
	console.log("Example app listening at http://%s:%s", hostname, port)
});
