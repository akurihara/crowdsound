// CONSTANTS
var PLAYING = 0;
var PAUSED = 1;

// GLOBAL VARIABLES
var m_id = "XH53DJ";
var m_party = { name:"", host:"", color:"" }
var m_playlist = [];
var m_currentSong = { songName:"", artist:"", album:"", 
     rating:-1, time:-1, duration:-1, isPlaying:false, key:""} 
//var m_currentSong = null;
var m_isHost = true;
var apiswf = null;
var callback_object = {};
var socket = io.connect();

var likedSongs = {};

$(document).ready(function() {
    initLoadingScreen();
    $('.seek').hide();
    $('.play_button').hide();
    /*
    if (localStorage['isHost'] === undefined) {
        window.location.replace('/');
    }
    */
    console.log('host: ' + (localStorage['isHost'] == 'true'));

    if (localStorage['isHost'] == 'true') {

        initSearch();
        initPlaylist(m_playlist);
        initHostPlayer();

        // on page load use SWFObject to load the API swf into div#apiswf
          var flashvars = {
            //'playbackToken': 'GBRSqEKT_____2R2cHlzNHd5ZXg3Z2M0OXdoaDY3aHdrbmNyb3dkc291bmQuYXdzLmFmLmNt_WLMmkAuiaj0NHWbt_uXDQ==',
              'playbackToken': 'GAlSpjTr_____2R2cHlzNHd5ZXg3Z2M0OXdoaDY3aHdrbmxvY2FsaG9zdGYUDYwpOao39sRSEQLBwUw=',

	  //'domain': 'crowdsound.aws.af.cm', 
            'domain': 'localhost', 

            'listener': 'callback_object'    // the global name of the object that will receive callbacks from the SWF
            };
          var params = {
            'allowScriptAccess': 'always'
          };
          var attributes = {};
          swfobject.embedSWF('http://www.rdio.com/api/swf/', // the location of the Rdio Playback API SWF
              'apiswf', // the ID of the element that will be replaced with the SWF
              1, 1, '9.0.0', 'expressInstall.swf', flashvars, params, attributes);
          initCallbacks();
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

            /*
            var d3 = results[2];
            m_playlist = d3;            
            m_currentSong.songName = d3[0].songName;
            m_currentSong.artist = d3[0].artist;
            m_currentSong.album = d3[0].album;
            m_currentSong.rating = d3[0].rating;
            m_currentSong.time = d3[0].time;
            m_currentSong.duration = d3[0].duration;
            m_currentSong.isPlaying= d3[0].isPlaying;
            m_currentSong.key=d3[0].key;
            */
            initPlaylist(m_playlist);
            
            initSearch();
            initGuestPlayer();
            handleMobileBrowser();
            closeLoadingScreen();
        });
    }
});

function initCallbacks() {
    console.log('host?: ' + localStorage['isHost']);
    if (localStorage['isHost']) {
        console.log('callback block');
        // Called once the API SWF has loaded and is ready to accept method calls.
        callback_object.ready = function ready(user) {
          // find the embed/object element
          apiswf = $('#apiswf').get(0);

        };
    }   
}
// socket.io stuff
socket.on('disconnect', function() { 
    console.log('socket.io disconnected');
});

$(window).resize(function() {
    handleMobileBrowser();
});

function handleMobileBrowser() {
    var mq = window.matchMedia( "(max-width: 1000px)" );
    if (!mq.matches) {
    } else {
        populatePartyData();
        $(".add_song_button").unbind();
        $(".add_song_button").click(function() {
            async.parallel([
                function(callback) {
                    $(".playlist_panel").animate({right: '1000'}, function() {
                        $(".playlist_panel").hide();
                        callback(null, "ok");  
                    });
                },
                function(callback) {
                    $(".m_player_panel").animate({right: '1000'}, function() {
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
            $(".search_panel").animate({left: '1000'}, function() {
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
