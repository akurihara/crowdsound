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
];

$(document).ready(function(){
    loadPlaylist();
});

var loadPlaylist = function() {
    console.log("loading playlist");

    $(".playlist").empty();
    for (var i=0; i<dummySongs.length; i++) {

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
