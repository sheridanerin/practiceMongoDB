var Mongoose = require('mongoose');

var birdModel = mongoose.schema({
		scientificName: {type: String, required: true, unique: true}
	,	color: {type: String, lowercase: true) //this will change the color to lowercase before saving to the DB. 
	,	region: String
	,	firstSightingEver: Date
	,	food: [String]
	,	foodDetails: [{
			name: String
		,	type: {type: String}
		,	genus: String
		}]
	, 	wingspan: Number
	, 	endangered: Boolean
	,	nest: {
			materials: [String]
		,	size: Number
		,	timeToBuild: Number
		,	locationDesc: String
		}
})

birdModel.pre('save', function( next ) {  //we can require certain things happen before the data is saved. 
	var bird = this;
	bird.scientificName.toLower(); 
	next();
}) 

module.exports = mongoose.model('bird', birdModel);