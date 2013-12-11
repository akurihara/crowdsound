function initGuestPlayer() {
    console.log("initialized guest player");

    $('.now_playing_song').html(m_currentSong.songName);
    $('.now_playing_artist').html(m_currentSong.artist);
    $('.now_playing_album').html(m_currentSong.album);
    $('.progress').attr("max", m_currentSong.duration);

    var id = setInterval(function() {
        if (m_currentSong.time >= m_currentSong.duration) {
            // request more data
            clearInterval(id);
        } else {
            $('.progress').attr("value", m_currentSong.time);
            $('.time_elapsed').html(secondsToMinutes(m_currentSong.time));
        }
        m_currentSong.time++;
    }, 1000);

    // hide shit
    initPlayer();
};

function initHostPlayer() {
    console.log("initialized host player");
 
    playBtn = $('.play_button');
    slider = $('.seek');
    timeLeft = $('#time_left');

    duration = $('.now_playing_song').attr('duration');
	
    // play button functionality
    playBtn.click(function() {
        if (!m_currentSong.isPlaying) {
            m_currentSong.isPlaying = true;
            playBtn.removeClass('glyphicon-play').addClass('glyphicon-pause');
            apiswf.rdio_play($('.now_playing_song').attr('trackKey'));
        } else {
            m_currentSong.isPlaying = false;
            playBtn.removeClass('glyphicon-pause').addClass('glyphicon-play');
            apiswf.rdio_pause();
        }
    });

    // seek bar functionality
    slider.bind("change", function() {
        apiswf.rdio_seek($(this).val());
        $(".seek").attr("max", $('.now_playing_song').attr('duration'));
    });

    // callback_object.playStateChanged = function playStateChanged(playState) {
    //     if (playState == 2) {
    //         console.log('moving to next song');
    //         var newSong = $('#playlist_item_0')

    //         // set all the current song stuff to the next song in queue
    //        m_currentSong.songName = newSong.attr('name');
    //        m_currentSong.artist = newSong.attr('artist');
    //        m_currentSong.album = newSong.attr('album');
    //        m_currentSong.duration = newSong.attr('duration');
    //        m_currentSong.key= newSong.attr('key');

    //        $('.now_playing_song').html(m_currentSong.songName);
    //        $('.now_playing_song').attr({'duration': m_currentSong.duration});
    //         $('.now_playing_artist').html(m_currentSong.artist);
    //         $('.now_playing_album').html(m_currentSong.album);
    //         $('.progress').attr("max", m_currentSong.duration);

    //         $('.seek').attr({'max': m_currentSong.duration});
    //         $('.now_playing_song').attr({'trackKey': m_currentSong.key});

    //         console.log('GET REMOVE PLAYED - end of song');
    //         // getRemovePlayed();
    //         postRemoveUnplayed(m_currentSong.key);
    //         // start playing next song
    //         apiswf.rdio_play($('.now_playing_song').attr('trackKey'));
    //     }
    // }

    callback_object.positionChanged = function positionChanged(currTime) {
        var duration = $('.now_playing_song').attr('duration');
        // song is over
        if (parseInt(currTime) == duration) {
            var newSong = $('#playlist_item_0')

            // set all the current song stuff to the next song in queue
           m_currentSong.songName = newSong.attr('name');
           m_currentSong.artist = newSong.attr('artist');
           m_currentSong.album = newSong.attr('album');
           m_currentSong.duration = newSong.attr('duration');
           m_currentSong.key= newSong.attr('key');

           $('.now_playing_song').html(m_currentSong.songName);
           $('.now_playing_song').attr({'duration': m_currentSong.duration});
            $('.now_playing_artist').html(m_currentSong.artist);
            $('.now_playing_album').html(m_currentSong.album);
            $('.progress').attr("max", m_currentSong.duration);

            $('.seek').attr({'max': m_currentSong.duration});
            $('.now_playing_song').attr({'trackKey': m_currentSong.key});

            console.log('GET REMOVE PLAYED - end of song');
            // getRemovePlayed();
            postRemoveUnplayed(m_currentSong.key);
            // start playing next song
            apiswf.rdio_play($('.now_playing_song').attr('trackKey'));
        }
        
        var rem = parseInt(duration - currTime, 10);
        //slider.value = (currTime/duration)*slider.max;
        slider.attr('value', (currTime/duration)*slider.attr('max'));

        pos = (currTime / duration) * 100,
        mins = Math.floor(rem/60,10),
        secs = rem - mins*60;
                    
        timeLeft.innerText = '-' + mins + ':' + (secs > 9 ? secs : '0' + secs);
    };

    // volume control

    var volumeSlider = $('#slider');
    volumeSlider.slider({
        range: 'min',
        min: 0,
        max: 100,
        value: 35,

        slide: function(event, ui) {
            var value = volumeSlider.slider('value'),  
            volume = $('#volume');  

            apiswf.rdio_setVolume(value*1.0/100);
  
            if (value <= 0) {
                volume.removeClass();
                volume.addClass("glyphicon").addClass("glyphicon-volume-off");
            } else if (value > 0 && volume <= 50) {   
                volume.removeClass();
                volume.addClass("glyphicon").addClass("glyphicon-volume-down");  
            } else if (value > 50) {  
                volume.removeClass();
                volume.addClass("glyphicon").addClass("glyphicon-volume-up");
            }
        }
    });

    initPlayer(m_currentSong/*hack*/);
};

function initPlayer(currSong) {
	
}
