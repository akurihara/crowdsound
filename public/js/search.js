function initSearch() {
	console.log("initialized search");

    $(".search_results").empty();

    // use a debounce plugin for jQuery to limit ajax calls to server
    debounceSearch = $.debounce(function (event) {
        var query = $('#search_box').val();
        if (query.length == 0) {
            $(".search_results").empty();
        }

        if (query.length > 3) {
            getSearch(query, m_id, function(results) {
            displaySongs(results);
            });
        }
    }, 300);

	$('#search_box').keyup(debounceSearch);
};

function displaySongs(results) {
    $(".search_results").empty();
    for (var i=0; i<results.length; i++) {
        var item = results[i];
        var d = "<div id='search_result"+i+"'></div>";
        $(".search_results").append(d);

        var inPlaylistState = item.inPlaylist ? "in_playlist" : "addable";
        var add = $("<span class='glyphicon glyphicon-plus blue " + inPlaylistState + "'></span>");

        add.attr({
            "songname" : item.song_name
          , "artist": item.artist
          , "album": item.album
	  , "trackKey": item.key
	  , "duration": item.duration
        });

        $("#search_result"+i).loadTemplate($("#search_result"),
            {
                //search_result_index: i+1,
                search_result_song_name: item.song_name,
                search_result_artist: item.artist,
                search_result_album: item.album,
                search_result_add: add
            });

        $(".in_playlist").each(function() {
            // something to show that its in the playlist and cannot be added
            $(this).hide();
        });
        
        $(".addable").each(function() {
            $(this).unbind();
            $(this).click(function() {
                var songName= $(this).attr("songName");
                var artist = $(this).attr("artist");
                var album = $(this).attr("album");
        		var trackKey = $(this).attr("trackKey");
        		var duration = $(this).attr("duration");

                $(this).hide();
                var mq = window.matchMedia( "(max-width: 770px)" );
                var animation = function() {
                    if (mq.matches) {
                        $(".search_panel").animate({left: '770'}, function() {
                            $(".search_panel").hide();
                            $(".m_player_panel").show();
                            $(".playlist_panel").show().css({
                                left: -($(".playlist_panel").width())
                            }).animate({
                                left: 0
                            }, function() {
                                $(".back_button").hide();
                                $(".add_song_button").show();
                                $(".search_panel").animate({left:'0px'});
                            });
                        });
                    }
                }
                postSong(trackKey, songName, artist, album, duration, animation);
            });
        });
    }
};
