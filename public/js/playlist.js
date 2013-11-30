var initPlaylist = function(playlist) {
    console.log("initialized playlist");

    $(".playlist").empty();
    for (var i=0; i<playlist.length; i++) {
        var item = playlist[i];
        var d = "<div id='playlist_item_"+i+"'></div>";
        $(".playlist").append(d);

        var heartState = item.like ? "glyphicon-heart" : "glyphicon-heart-empty";
        var like = "<span class='glyphicon " + heartState + "'></span>"; 

        $("#playlist_item_"+i).loadTemplate($("#playlist_item"),
            {
                playlist_item_index: i+1,
                playlist_item_song_name: item.song_name,
                playlist_item_artist: item.artist,
                playlist_item_album: item.album,
                playlist_item_rating: item.rating,
                playlist_item_like: like
            });
    };
};
