function initSearch(partyId) {
	console.log("initialized search");
    $(".search_results").empty();
	$('#search_box')[0].onkeypress = function (event) {
        var query = $('#search_box').val();
        getSearch(query, partyId, function(results) {
            displaySongs(results);
        });
  	};
};

function displaySongs(query) {
    $(".search_results").empty();
    for (var i=0; i<query.length; i++) {
        var item = query[i];
        var d = "<div id='search_result"+i+"'></div>";
        $(".search_results").append(d);

        var inPlaylistState = item.in_playlist ? "in_playlist" : "";
        var add = "<span class='glyphicon glyphicon-plus" + inPlaylistState + "'></span>";

        $("#search_result"+i).loadTemplate($("#search_result"),
            {
                //search_result_index: i+1,
                search_result_song_name: item.song_name,
                search_result_artist: item.artist,
                search_result_album: item.album,
                search_result_add: add
            });
    };
};
