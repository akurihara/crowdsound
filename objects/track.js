exports.Track = function(key, name, artist, album, duration) {
	// class variables
	this.key = key;
	this.name = name;
	this.artist = artist;
	this.album = album;
	this.duration = duration;
	this.numLikes = 1;
}