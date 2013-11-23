$(document).ready(function() {
    initLoadingScreen();
    function initParty() {
        initPlayer();
        initPlaylist();
    };
    getParty(id, initParty);
});

getParty(id, initParty)
