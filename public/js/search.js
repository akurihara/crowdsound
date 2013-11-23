var dummySongsSearch = [ 
    {
        song_name: "I'm Gonna Be (500 Miles)",
        artist: "The Proclaimers",
        album: "",
        in_playlist: true
    },
    {
        song_name: "New Slaves",
        artist: "Kanye West",
        album: "Yeezus",
        in_playlist: true
    },
    {
        song_name: "Work",
        artist: "Iggy Azealea",
        album: "The New Classic",
        in_playlist: false 
    }, 
    {
        song_name: "Picasso Baby",
        artist: "Jay-Z",
        album: "Holy Grail",
        in_playlist: false
    },
    {
        song_name: "Black Skinhead",
        artist: "Kanye West", 
        album: "Yeezus", 
        in_playlist: true
    },
    {
        song_name: "Black Mirror",
        artist: "The Arcade Fire", 
        album: "", 
        in_playlist: true
    },
    {
        song_name: "Back In Black",
        artist: "ACDC", 
        album: "", 
        in_playlist: true
    },
    {
        song_name: "Blackhole Sun",
        artist: "Soundgarden", 
        album: "", 
        in_playlist: true
    },
];


function initSearch() {
	console.log("loading search");

	$('.search_results').hide();
	$('#search_box')[0].onkeypress = function (event) {
    		$('.search_results').show();
  	};

    $(".search-results").empty();
    for (var i=0; i<4; i++) {
        var item = dummySongsSearch[i];
        var d = "<div id='search_result"+i+"'></div>";
        $(".search_results").append(d);

        var inPlaylistState = item.in_playlist ? "in_playlist" : "";
        var add = "<span class='glyphicon glyphicon-plus" + inPlaylistState + "'></span>";

        $("#search_result"+i).loadTemplate($("#search_result"),
            {
                search_result_index: i+1,
                search_result_song_name: item.song_name,
                search_result_artist: item.artist,
                search_result_album: item.album,
                search_result_add: add
            });
    };

}