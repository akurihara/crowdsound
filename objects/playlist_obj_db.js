exports.PlaylistDB = function(mongoose, db) {
	this.queue = [];
	this.queueMap = {};
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
}

exports.PlaylistDB.prototype.addTrack = function(track) {
	if (this.currentSong === null) {
		this.currentSong = track;
	}
	
	var track_db = new this.Track({
		key: track.key,
		name: track.name,
		artist: track.artist,
		album: track.album,
		duration: track.duration,
		numLikes: 1
	});

	track_db.save(function (err, track) {
	  if (err) return console.error(err);
	  console.log(track);
	});
}

// client will send track key from the item in their playlist view
exports.PlaylistDB.prototype.upvote = function(trackKey) {
	this.Track.update(
   { key : trackKey },
   { $inc : { numLikes : 1 } },
  );
}

// removes a song from the queue because it is now playing
exports.PlaylistDB.prototype.removePlayed = function() {
	console.log('[mac10] removing ' + this.queue[0].name);
	this.currentSong = this.queueMap[this.queue[0].key];
	delete this.queueMap[this.queue[0].key];
	this.queue = this.queue.slice(1);
	console.log('[mac10] successfully removed played');

	this.Track.remove({});
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
	this.Track.find().sort('-numLikes').exec(function(err, tracks) {
		console.log(tracks);
	});
}