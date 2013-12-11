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
                playlist_item_like: like,
                playlist_item_key: item.key
            });
    		


    
    };
   
	socket.on('playlist', function(object) {
		if (m_currentSong.songName === "" && object.playlist[0] != null) {
  		   m_currentSong = {};
   		   m_currentSong.songName = object.playlist[0].name;
           m_currentSong.artist = object.playlist[0].artist;
           m_currentSong.album = object.playlist[0].album;
           m_currentSong.rating = object.playlist[0].rating;
           m_currentSong.time = object.playlist[0].time;
           m_currentSong.duration = object.playlist[0].duration;
           m_currentSong.isPlaying= object.playlist[0].isPlaying;
           m_currentSong.key= object.playlist[0].key;

           $('.now_playing_song').html(m_currentSong.songName);
           $('.now_playing_song').attr({'duration': m_currentSong.duration});
		    $('.now_playing_artist').html(m_currentSong.artist);
		    $('.now_playing_album').html(m_currentSong.album);
		    $('.progress').attr("max", m_currentSong.duration);

		    $('.seek').attr({'max': m_currentSong.duration});

        if (localStorage['isHost'] == 'true') {
		        // busy loop until apiswf loaded
            while (apiswf == null) {}

            getRemovePlayed();
            apiswf.rdio_play(object.playlist[0].key);
            m_currentSong.isPlaying = true;
            playBtn.removeClass('glyphicon-play').addClass('glyphicon-pause');
         }
  		}

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


