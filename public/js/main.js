// GLOBAL VARIABLES
var m_id = "HQ12QM";
var m_name, m_host, m_color;
var m_playlist = [];
var m_nowPlaying;
var m_isHost = false;

$(document).ready(function() {
    initLoadingScreen();

    getPartyData(m_id, function(d1) {
        m_name = d1.partyName;
        m_host = d1.partyHost;
        m_color = d1.partyColor;

        getPlaylist(m_id, function(d2){
            console.log("playlist data");
            m_playlist = d2;

            // start the application!
            if (m_isHost) {initHostPlayer();}
            else {initGuestPlayer();}
            initPlaylist(m_playlist);
            initSearch(m_id);
            closeLoadingScreen();
        });
    });
});

function initLoadingScreen() {

};

function closeLoadingScreen() {

};
