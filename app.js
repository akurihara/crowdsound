
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var socketio = require('socket.io')
var OAuth = require('OAuth');
var app = express();

//require('./db');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'test' }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname, '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/main', routes.main);
app.get('/login', routes.login);
app.get('/api', routes.api);

/*
oauth.post(
    "http://api.rdio.com/1/",
    null,
    null,
    {
        method: "get",
        keys: "a184236,a254895,a242205"
    },
    function(result) {
        console.log(result);
    }
);
*/

var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// SOCKET STUFF!
var io = socketio.listen(server);

io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'Welcome to CrowdSound!' });
  socket.on('send', function (data) {
    io.sockets.emit('message', data);
  });
});

