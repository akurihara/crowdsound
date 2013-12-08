
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.main = function(req, res){
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
		console.log(oauth_token);
		console.log(oauth_token_secret);
		console.log(results.login_url); 

		/*
		req.session.oa = oauth;
		req.session.oauth_token = oauth_token;
		req.session.oauth_token_secret = oauth_token_secret;
		*/
	                
		// redirect the user to authorize the token
		res.redirect(results.login_url + '?oauth_token=' + oauth_token);              
	});
};