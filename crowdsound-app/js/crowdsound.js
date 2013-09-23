require(['$api/models', '$views/list#List'], function(models, List) {

var playlist = models.Playlist.fromURI('spotify:user:spotify:playlist:2lusnaAIIckVJJFKM2upOe');
var list = List.forPlaylist(playlist);
document.body.appendChild(list.node);
list.init();

});

/*
var playlist = models.Playlist.fromURI('spotify:user:spotify:playlist:2lusnaAIIckVJJFKM2upOe');
var list = List.forPlaylist(playlist);
document.body.appendChild(list.node);
*/