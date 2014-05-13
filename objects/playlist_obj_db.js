exports.PlaylistDB = function(mongoose, db) {
	this.currentSong = null;

	var trackSchema = new mongoose.Schema({
		key: String,
	  name: String,
	  artist: String,
	  album: String,
	  duration: Number,
	  numLikes: Number
	});

	this.Track = mongoose.model('Track', trackSchema);

	// Clear the database
	this.Track.remove({}, function(err) {
		console.log('database cleared');
	});
}

exports.PlaylistDB.prototype.addTrack = function(key, name, artist, album, duration) {
	
	// Create a new track document for the database
	var track = new this.Track({
		key: key,
		name: name,
		artist: artist,
		album: album,
		duration: duration,
		numLikes: 1
	});

	if (this.currentSong === null) {
		this.currentSong = track;
	} else {
		// save the track
		track.save(function (err, track) {
		  if (err) return console.error(err);
		});
	}

}

// client will send track key from the item in their playlist view
exports.PlaylistDB.prototype.upvote = function(trackKey) {
	this.Track.update(
   { key : trackKey },
   { $inc : { numLikes : 1 }},
   function(err, number, res) {
   	if (err) return console.error(err);
   }
  );
}

// removes a song from the queue because it is now playing
exports.PlaylistDB.prototype.removePlayed = function() {

	this.Track.find().sort('-numLikes').exec(function(err, result) {
		topTrack = result[0];
		console.log('[akurihar] removing ' + topTrack.name);
		this.currentSong = result[0];
		this.Track.remove({ key : topTrack.key}, function(err) {
			if (err) return console.error(err);
		});
	});
}

// removes a track elsewhere in the queue - only host can do this
exports.PlaylistDB.prototype.removeUnplayed = function(trackKey) {
	// TODO
}

exports.PlaylistDB.prototype.contains = function(trackKey) {
	return (this.queueMap[trackKey] !== undefined);

	//this.Track.findOne({ occupation: trackKey }).exec();

}

exports.PlaylistDB.prototype.getQueue = function(callback) {
	this.Track.find().sort('-numLikes').exec(function(err, result) {
		callback(result);
	});
}