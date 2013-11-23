$(document).ready(function() {
    initLoadingScreen();
    function initParty() {
        initPlayer();
        initPlaylist();
        initSearch();
    };
    getParty(id, initParty);
});

