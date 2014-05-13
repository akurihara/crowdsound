var Track = require('../objects/track');
var Playlist = require('../objects/playlist_obj');
var PlaylistDB = require('../objects/playlist_obj_db');
var playlist = new Playlist.Playlist();
var global_access_token = "";
var global_access_token_secret = "";

// Initialize Database Object
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('database connection opened');
});

var playlist_db = new PlaylistDB.PlaylistDB(mongoose, db);

// Initialize OAuth Object
var OAuth = require('oauth');
var oauth = new OAuth.OAuth(
  "http://api.rdio.com/oauth/request_token",
  "http://api.rdio.com/oauth/access_token",
  "62nph9uusuqtqt3vdykqr2bx",
  "KVgu9dkymP",
  "1.0",
  //"http://crowdsound.aws.af.cm/main",
  "http://localhost:3000/main/",
  "HMAC-SHA1"
);

exports.initSockets = function(){
  var sockets = require('../app').sockets;
  sockets.on('connection', function (socket) {
    socket.emit('playlist', { playlist: playlist.queue, currentSong: playlist.currentSong});
  });
}

exports.index = function(req, res){
  res.render('index');
};

exports.main = function(req, res){
  if (req.session.oauth_access_token) {
  	oauth.getOAuthAccessToken(
  		req.session.oauth_token, 
      req.session.oauth_token_secret,
      req.param('oauth_verifier'),
      function(error, oauth_access_token, oauth_access_token_secret, results2) {
      	req.session.oauth_access_token = oauth_access_token;
  			req.session.oauth_access_token_secret = oauth_access_token_secret;
        global_access_token = oauth_access_token;
        global_access_token_secret = oauth_access_token_secret;
      });
  }
  res.render('main');
};

exports.login = function(req, res){
	oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
		req.session.oa = oauth;
		req.session.oauth_token = oauth_token;
		req.session.oauth_token_secret = oauth_token_secret;
    req.session.host = true;

		// Redirect the user to authorize the token
		res.redirect(results.login_url + '?oauth_token=' + oauth_token);              
	});
};

exports.search = function(req, res) {	
	var url = require("url");
	var query_string = url.parse(req.url, true).query.query;

	var params = {
  	method: "search",
    types: "Track",
    query: query_string,
    count: 8
	};

	oauth.post(
    "http://api.rdio.com/1/",
    global_access_token,
    global_access_token_secret,
    params,
    function(err, response) {
    	var response = JSON.parse(response);
    	var search_results = response.result.results;

    	search_results.forEach(function(track) {
    		track.song_name = track.name;

        var inPlaylist = playlist.contains(track.key);
        track.inPlaylist = inPlaylist;
    	});
    	res.send(search_results);
    }
	);
};

exports.addSong = function(req, res) {
	var data = req.body;
	var track = new Track.Track(data.key, data.name, data.artist, data.album, data.duration);
	playlist.addTrack(track);
  playlist_db.addTrack(data.key, data.name, data.artist, data.album, data.duration);

  res.end("Song added!");
	broadcastPlaylist();
};

exports.upvote = function(req, res) {
	playlist.upvote(req.body.key);
  playlist_db.upvote(req.body.key);
  res.end("Song upvoted!");
	broadcastPlaylist();
};

exports.removePlayed = function(req, res) {
	playlist.removePlayed();
  playlist_db.removePlayed();
  res.end('Song removed!');
  broadcastPlaylist();
};

exports.removeUnplayed = function(req, res) {
	playlist.removeUnplayed(req.body.key);
  res.end('Song removed!');
	broadcastPlaylist();
};

function broadcastPlaylist() {
	// broadcast updated playlist queue object to all clients
  var sockets = require('../app').sockets;
  playlist_db.getQueue(function(list) {
    sockets.emit('playlist', { playlist: list, currentSong: playlist_db.currentSong });
  });
}
