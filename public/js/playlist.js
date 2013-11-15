var dummySongs = [ 
    {
        song_name: "Work",
        artist: "Iggy Azealea",
        album: "The New Classic",
        rating: 4,
        like: false 
    }, 
    {
        song_name: "New Slaves",
        artist: "Kanye West",
        album: "Yeezus",
        rating: 12,
        like: true
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

$(document).ready(function(){
    loadPlaylist();
});

var loadPlaylist = function() {
    console.log("loading playlist");

    $(".playlist").empty();
    for (var i=0; i<3; i++) {
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

    $(".song1").click(function() {
        //add3
        var i = 3;
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

    });
    $(".song2").click(function() {
        //add4
        var i = 4;
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
    });
    $(".song3").click(function() {
        //add5
        var i = 5;
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

    });
    $(".song4").click(function() {
        //add6
        var i = 6;
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
    });
};
