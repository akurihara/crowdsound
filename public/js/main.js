// CONSTANTS
var PLAYING = 0;
var PAUSED = 1;

// GLOBAL VARIABLES
var m_id = "HQ12QM";
var m_party = { name:"", host:"", color:"" }
var m_playlist = [];
var m_currentSong = { songName:"", artist:"", album:"", 
    rating:-1, time:-1, duration:-1, isPlaying:false } 
var m_isHost = false;

$(document).ready(function() {
    initLoadingScreen();

    if (m_isHost) {
    } else {
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

            var d2 = results[1];
            m_currentSong.songName = d2.songName;
            m_currentSong.artist = d2.artist;
            m_currentSong.album = d2.album;
            m_currentSong.rating = d2.rating;
            m_currentSong.time = d2.time;
            m_currentSong.duration = d2.duration;
            m_currentSong.isPlaying= d2.isPlaying;

            var d3 = results[2];
            m_playlist = d3;

            initPlaylist(m_playlist);
            populatePartyData();
            initSearch();
            initGuestPlayer();

            handleMobileBrowser();
            closeLoadingScreen();
        });
    }
});

$(window).resize(function() {
    handleMobileBrowser();
});

function handleMobileBrowser() {
    var mq = window.matchMedia( "(max-width: 480px)" );
    if (!mq.matches) {
    } else {
        $(".add_song_button").unbind();
        $(".add_song_button").click(function() {
            async.parallel([
                function(callback) {
                    $(".playlist_panel").animate({right: '480px'}, function() {
                        $(".playlist_panel").hide();
                        callback(null, "ok");  
                    });
                },
                function(callback) {
                    $(".m_player_panel").animate({right: '480px'}, function() {
                        $(".m_player_panel").hide();
                        callback(null, "ok");
                    });
                }
            ], function(err, result) {
                if (result[0] == "ok" && result[1] == "ok")
                    $(".search_panel").show().css({
                        right: -($(".search_panel").width())
                    }).animate({
                        right: 0
                    }, function() {
                        $(".search_panel").show();
                        $(".back_button").show();
                        $(".add_song_button").hide();

                        // revert animations
                        //$(".playlist_panel").animate({right: '0px'});
                        //$(".m_player_panel").animate({right: '0px'});
                    });
            });
        });

        $(".back_button").unbind();
        $(".back_button").click(function() {
            $(".search_panel").animate({left: '480px'}, function() {
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
        });
    }

};

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
