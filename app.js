
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
//var socketio = require('socket.io');
var app = express();

require('./db');

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
app.get('/api/search', routes.search);
app.get('/api/removePlayed', routes.removePlayed);

app.post('/api/addSong', routes.addSong);
app.post('/api/upvote', routes.upvote);
app.post('/api/removeUnplayed', routes.removeUnplayed);

var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// SOCKET STUFF!
//var io = socketio.listen(server, { log: false });
/*
io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'Welcome to CrowdSound!' });
  socket.on('send', function (data) {
    io.sockets.emit('message', data);
  });
});
*/

//exports.sockets = io.sockets;
//routes.initSockets();
