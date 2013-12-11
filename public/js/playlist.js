var initPlaylist = function(playlist) {
    console.log("initialized playlist");

  		if (m_currentSong == null) {
  			m_currentSong = {};
   		   m_currentSong.songName = playlist[0].songName;
           m_currentSong.artist = playlist[0].artist;
           m_currentSong.album = playlist[0].album;
           m_currentSong.rating = playlist[0].rating;
           m_currentSong.time = playlist[0].time;
           m_currentSong.duration = playlist[0].duration;
           m_currentSong.isPlaying= playlist[0].isPlaying;
           m_currentSong.key= playlist[0].key;
           
           getRemovePlayed();
           apiswf.rdio_play(playlist[0].key);
  		}
    

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
                playlist_item_like: like,
                playlist_item_key: item.key
            });
    		


    
    };
   
	socket.on('playlist', function(object) {
	    $(".playlist").empty();
	    for (var i=0; i<object.playlist.length; i++) {
	        var item = object.playlist[i];
	        var d = "<div id='playlist_item_"+i+"'></div>";
	        $(".playlist").append(d);
	
	        var heartState = item.like ? "glyphicon-heart" : "glyphicon-heart-empty";
	        var like = "<span class='glyphicon " + heartState + "'></span>"; 
	
	        $("#playlist_item_"+i).loadTemplate($("#playlist_item"),
	            {
	                playlist_item_index: i+1,
	                playlist_item_song_name: item.name,
	                playlist_item_artist: item.artist,
	                playlist_item_album: item.album,
	                playlist_item_rating: item.rating,
	                playlist_item_like: like,
	                playlist_item_key: item.key
	            });
	    };
	});
	/*
	function() {
		getRemovePlayed();
		playlist.
		$('.now_playing_song').html(m_currentSong.songName);
    	$('.now_playing_artist').html(m_currentSong.artist);
    	$('.now_playing_album').html(m_currentSong.album);
    	$('.progress').attr("max", m_currentSong.duration);
    	
	}
	*/
	/*
	 $(".likeable").each(function() {
            $(this).unbind();
            $(this).click(function() {
            	//item.like = true;
            	
                var songName= $(this).attr("songName");
               	
                postUpvote(trackKey);
            });
     });
	*/
	
};


