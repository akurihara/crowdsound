var dummySongs = [ 
    {
        song_name: "I'm Gonna Be (500 Miles)",
        artist: "The Proclaimers",
        album: "",
        rating: 15,
        like: true
    },
    {
        song_name: "New Slaves",
        artist: "Kanye West",
        album: "Yeezus",
        rating: 12,
        like: true
    },
    {
        song_name: "Work",
        artist: "Iggy Azealea",
        album: "The New Classic",
        rating: 4,
        like: false 
    }, 
    {
        song_name: "Picasso Baby",
        artist: "Jay-Z",
        album: "Holy Grail",
        rating: 2,
        like: false
    },
    {
        song_name: "Black Skinhead",
        artist: "Kanye West", 
        album: "Yeezus", 
        rating: 1,
        like: true
    },
    {
        song_name: "Black Mirror",
        artist: "The Arcade Fire", 
        album: "", 
        rating: 1,
        like: true
    },
    {
        song_name: "Back In Black",
        artist: "ACDC", 
        album: "", 
        rating: 1,
        like: true
    },
    {
        song_name: "Blackhole Sun",
        artist: "Soundgarden", 
        album: "", 
        rating: 1,
        like: true
    },
];

var initPlaylist = function() {
    console.log("loading playlist");

    $(".playlist").empty();
    for (var i=0; i<4; i++) {
        var item = dummySongs[i];
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
