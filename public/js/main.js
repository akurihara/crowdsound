// GLOBAL VARIABLES
var partyId = "123";
var partyName, partyHost, partyColor;
var partyPlaylist = [];

$(document).ready(function() {
    initLoadingScreen();

    getPartyData(id, function(d1) {
        partyName = d1.partyName;
        partyHost = d1.partyHost;
        partyColor = d1.partyColor;

        getPlaylist(id, function(d2){
            partyPlaylist = d2;

            // start the application!
            initPlayer();
            initPlaylist();
            initSearch();
            closeLoadingScreen();
        });
    });
});

