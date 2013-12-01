/*
 * Queries the server with the party id to find a party
 * Party data includes:
 *   party name
 *   party description
 *   host name
 *   unique color hexcode
 */
function getPartyData(id, callback) {
    /*
    $.ajax({
        url: "..."
      , 
    })
     .done(callback(data));
     .fail(...);
     */
    return callback(dummyPartyData);
};

function getPlaylist(id, callback) {
    return callback(dummyPlaylist);
};

function getSearch(query, id, callback) {
    return callback(dummySongsSearch);
};

function getSong(id, callback) {
    return callback(dummySongData);
};

/** WARNING: DUMMY DATA LIVES BELOW **/
var dummySongData = {
    songName: "I'm Gonna Be (500 Miles)"
  , artist: "The Proclaimers"
  , album: ""
  , rating: 15
  , time: 123 // in seconds
  , duration: 300 // in seconds
  , isPlaying: true
}

var dummyPartyData = {
    partyName : "Happy Times"
  , partyHost : "Koji"
  , partyColor: "#88F"
}

var dummySongsSearch = [ 
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
        song_name: "New Slaves",
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
        song_name: "Work",
        artist: "Iggy Azealea",
        album: "The New Classic",
        in_playlist: false 
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

var dummyPlaylist = [ 
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
        like: false
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
        like: false
    },
    {
        song_name: "Blackhole Sun",
        artist: "Soundgarden", 
        album: "", 
        rating: 1,
        like: false
    },
];
