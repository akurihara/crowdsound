var initPlaylist = function(playlist) {
    console.log("initialized playlist");

	// populate playlist with songs
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
    // attach click events to songs in list
    $(".likeable").each(function() {
        $(this).unbind();
        $(this).click(function() {
        	var trackKey = $(this).attr("trackkey");
            console.log(trackKey);
            postUpvote(trackKey);
        });
    });
   
    // update playlist
	socket.on('playlist', function(object) {
    console.log(object);
		if (m_currentSong.songName === "" && object.currentSong != null) {
  		   m_currentSong = {};
         console.log(object.currentSong);
   		   m_currentSong.songName = object.currentSong.name;
           m_currentSong.artist = object.currentSong.artist;
           m_currentSong.album = object.currentSong.album;
           m_currentSong.rating = object.currentSong.rating;
           m_currentSong.time = object.currentSong.time;
           m_currentSong.duration = object.currentSong.duration;
           m_currentSong.isPlaying= object.currentSong.isPlaying;
           m_currentSong.key= object.currentSong.key;

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
            apiswf.rdio_play(object.currentSong.key);
            m_currentSong.isPlaying = true;
            playBtn.removeClass('glyphicon-play').addClass('glyphicon-pause');
         }
  		}

	    $(".playlist").empty();
	    
		// populate playlist with songs
	    for (var i=0; i<object.playlist.length; i++) {
	        var item = object.playlist[i];
	        var d = "<div id='playlist_item_"+i+"' key='"+item.key+"' name='"+item.name+"' artist='"+item.artist+"' album='"+item.album+"' duration='"+item.duration+"'></div>";
	        $(".playlist").append(d);
	
	        var heartState = item.like ? "glyphicon-heart" : "glyphicon-heart-empty";
	        var like = "<span trackkey='" + item.key + "' class='likeable glyphicon " + heartState + "'></span>"; 
	
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
	    }; // for loop
	    
	    
        $(".likeable").each(function() {
        	$(this).unbind();
        	$(this).click(function() {
           		var trackKey = $(this).attr("trackkey");
                console.log(trackKey);
                postUpvote(trackKey);
        	});
    	}); //likeable each    
	});	//socket
};  //init playlist


