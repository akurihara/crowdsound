
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.main = function(req, res){
	var OAuth = require('OAuth');
	var oauth = new OAuth.OAuth(
		  "http://api.rdio.com/oauth/request_token",
		  "http://api.rdio.com/oauth/access_token",
		  "62nph9uusuqtqt3vdykqr2bx",
		  "KVgu9dkymP",
		  "1.0",
		  "http://localhost:3000/main",
		  "HMAC-SHA1"
	);

	oauth.getOAuthAccessToken(
		req.session.oauth_token, 
    req.session.oauth_token_secret,
    req.param('oauth_verifier'),
    function(error, oauth_access_token, oauth_access_token_secret, results2) {
    	req.session.oauth_access_token = oauth_access_token;
			req.session.oauth_access_token_secret = oauth_access_token_secret;
			//console.log("access");
			//console.log(oauth_access_token + " " + oauth_access_token_secret);
    });
  res.render('main');
};

exports.login = function(req, res){
	var OAuth = require('OAuth');
	var oauth = new OAuth.OAuth(
	  "http://api.rdio.com/oauth/request_token",
	  "http://api.rdio.com/oauth/access_token",
	  "62nph9uusuqtqt3vdykqr2bx",
	  "KVgu9dkymP",
	  "1.0",
	  "http://localhost:3000/main",
	  "HMAC-SHA1"
	);

	oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
		req.session.oa = oauth;
		req.session.oauth_token = oauth_token;
		req.session.oauth_token_secret = oauth_token_secret;
	                
		// Redirect the user to authorize the token
		res.redirect(results.login_url + '?oauth_token=' + oauth_token);              
	});
};

exports.api = function(req, res) {
	var OAuth = require('OAuth');
	var url = require("url");

	var oauth = new OAuth.OAuth(
		  "http://api.rdio.com/oauth/request_token",
		  "http://api.rdio.com/oauth/access_token",
		  "62nph9uusuqtqt3vdykqr2bx",
		  "KVgu9dkymP",
		  "1.0",
		  "http://localhost:3000/main",
		  "HMAC-SHA1"
	);

	var queryString = url.parse(req.url, true).query.query;
	
	oauth.post(
    "http://api.rdio.com/1/",
    req.session.oauth_access_token,
    req.session.oauth_access_token_secret,
    {
        method: "search",
        types: "Track",
        query: queryString,
        count: 7
    },
    function(err, response) {
    	var response = JSON.parse(response);
    	console.log(response);
    	//console.log(response.result.results);
    	var searchResults = response.result.results;
    	searchResults.forEach(function(track) {
    		track.song_name = track.name;
        // track.artist: "Jay-Z";
        // track.album: "Holy Grail";
        track.inPlaylist = false;
    	});
    	res.send(searchResults);
    }
	);

}