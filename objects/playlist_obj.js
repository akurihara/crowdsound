exports.Playlist = function() {
	this.queue = [];
	this.queueMap = {};
}

// sorts the queue based on number of likes for each track
exports.Playlist.prototype.sortQueue = function() {
	this.queue.sort(
		function(t1, t2) {
			return (t1.numLikes > t2.numLikes) ? 1 : ((t1.numLikes < t2.numLikes) ? -1 : 0);
		} 
	);
}

exports.Playlist.prototype.addTrack = function(track) {
	this.queueMap[track.key] = track;
	this.queue.push(track);
	console.log('[mac10] added track ' + track.name);
}

// client will send track key from the item in their playlist view
exports.Playlist.prototype.upvote = function(trackKey) {
	this.queueMap[trackKey].numLikes++;
	this.sortQueue();
	console.log('[mac10] upvoted track ' + trackKey + ' to ' + this.queueMap[trackKey].numLikes);
}

// removes a song from the queue because it is now playing
exports.Playlist.prototype.removePlayed = function() {
	console.log('[mac10] removing ' + this.queue[0].name);
	delete this.queueMap[this.queue[0].key];
	this.queue = this.queue.slice(1);
	console.log('[mac10] successfully removed played');
}

// removes a track elsewhere in the queue - only host can do this
exports.Playlist.prototype.removeUnplayed = function(trackKey) {
	// set likes to -1, then sort so it moves to the end of the queue
	this.queueMap[trackKey].numLikes = -1;
	this.sortQueue();

	delete this.queueMap[trackKey];
	this.queue = this.queue.slice(0, this.queue.length-1);
	console.log('[mac10] successfully removed unplayed');
}