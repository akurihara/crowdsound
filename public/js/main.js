// CONSTANTS
var PLAYING = 0;
var PAUSED = 1;

// GLOBAL VARIABLES
var m_id = "HQ12QM";
var m_party = { name:"", host:"", color:"" }
var m_playlist = [];
var m_currentSong = { songName:"", artist:"", album:"", 
    rating:-1, time:-1, duration: -1, isPlaying:false } 
var m_isHost = false;

$(document).ready(function() {
    initLoadingScreen();

    async.series([
        function(callback) {
            getPartyData(m_id, function(d1) {
                callback(null, d1);
            });
        },
        function(callback) {
            getSong(m_id, function(d2) {
                callback(null, d2);
            })
        },
        function(callback) {
            getPlaylist(m_id, function(d3){
                callback(null, d3);
            });
        }
    ], function(err, results) {
        if (err) return;

        var d1 = results[0];
        m_party.name = d1.partyName;
        m_party.host = d1.partyHost;
        m_party.color = d1.partyColor;
        populatePartyData();

        var d2 = results[1];
        m_currentSong.songName = d2.songName;
        m_currentSong.artist = d2.artist;
        m_currentSong.album = d2.album;
        m_currentSong.rating = d2.rating;
        m_currentSong.time = d2.time;
        m_currentSong.duration = d2.duration;
        m_currentSong.playState = d2.playState;
        if (m_isHost) {initHostPlayer();}
        else {initGuestPlayer(m_currentSong);}

        var d3 = results[2];
        m_playlist = d3;
        initPlaylist(m_playlist);
        initSearch(m_id);

        closeLoadingScreen();
    });
});

function populatePartyData(data) {
    $('.party_code').html(m_id);
    $('.party_name').html(m_party.name);
};

function initLoadingScreen() {

};

function closeLoadingScreen() {

};

function secondsToMinutes(s) {
    var minutes = Math.floor(s/60);
    var seconds = (seconds = s - minutes * 60) > 9 ? seconds : "0"+seconds;
    return minutes + ":" + seconds;
};
