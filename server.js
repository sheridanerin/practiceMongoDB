var express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , mongojs = require('mongojs')
    , Bird = require('./birdsModel.js');
    , port = 8000
    , db = mongojs('birds')
    , sighting = db.collection('sighting');

var app = express();

app.use(bodyParser.json());
app.use(cors());

Bird.find({}, function( err, data ) {
	if (err) res.status(500).send(err);
	else res.send(data);
})

bird.find() //1st way to do this!!!!!!
	.where('wingspan').gt(12) // allows all wingspans greater than 12.
	.where('color').equals('blood red') // allows only birds with property color equal to red. 
	.sort(-"wingspan") // the dash means descending(largest to smallest).  With no dash it is ascending(smallest to largest)
	.limit(10);  // allows us to say we only want the first 10.
	.exec(function( err, data ) {
		if (err) res.status(500).send(err);
		else res.send(data);
	})

bird.find() //2nd way to do this!!!!!!
	.where('wingspan').gt(12) // allows all wingspans greater than 12.
	.where('color').equals('blood red') // allows only birds with property color equal to red. 
	.sort(-"wingspan") // the dash means descending(largest to smallest).  With no dash it is ascending(smallest to largest)
	.limit(10);  // allows us to say we only want the first 10.
	.exec() // this automatically returns a promise which means we can use a .then().
	.then(function( data ) {
		//Handles results
	} function( err ) {
		//Hanldes err
	})


var newBird = new Bird({ // creates a new bird model, this would most like be passed new info from the view. 
		scientificName: "Genus Menus Birdus Maxius"
	,	color: "blood red"
	, 	region: "Sparta"
	,	firstSightingEver: new date();
	,	food: ["people", "bugs"]
	, 	wingspan: 17
	, 	endangered: false
	,	nest: {
			materials: ["blown Over Trees", "rooftops", "people"]
		,	size: 500
		,	timeToBuild: 200
		,	locationDesc: "mountaintops"
		}
	//etc
});

newBird.save(function( err, data ) { // pushes new bird to database
	if (err) res.status(500).send(err);
	else res.send(data);
})

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