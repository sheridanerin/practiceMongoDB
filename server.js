var express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , mongojs = require('mongojs')
    , bird = require('./birdsModel.js');
    , port = 8000
    , db = mongojs('birds')
    , sighting = db.collection('sighting');

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/sighting', function(req, res, next) {
	sighting.insert(req.body, function( err, data ) {
		if (err) res.status(500).send(err);
		else res.send(data);
	});
});

app.get('/api/sighting/', function( req, res, next ) {
	sighting.find(req.query, function( err, data ) {
		if (err) res.status(500).send(err);
		else res.send(data);	
	});
});

app.put('/api/sighting/', function( req, res, next ) {
	sighting.update({ "_id": mongojs.ObjectId(req.query.id) }, req.body, function( err, data ) {
		if (err) res.status(500).send(err);
		else res.send(data);
	});
});

app.delete('/api/sighting/:id', function( req, res, next ) {
	sighting.remove({ "_id": mongojs.ObjectId(req.query) }, function( err, data ) {
		if (err) res.status(500).send(err);
		else res.send(data);
	});
});

app.listen(port, function() {
	console.log('listening on port ' + port);
})