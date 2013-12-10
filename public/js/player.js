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

    song = new Audio('audio/I\'m_Gonna_Be.mp3');
    song.volume = .35;
    duration = song.duration;

    // play button functionality
    playBtn.click(function() {
        if (!m_currentSong.isPlaying) {
            m_currentSong.isPlaying = true;
            playBtn.removeClass('glyphicon-play').addClass('glyphicon-pause');
            //song.play();
            alert('about to play');
            apiswf.rdio_play('t2891787');
        } else {
            m_currentSong.isPlaying = false;
            playBtn.removeClass('glyphicon-pause').addClass('glyphicon-play');
            // song.pause();
            apiswf.rdio_pause();
        }
    });

    // seek bar functionality
    slider.bind("change", function() {
        song.currentTime = $(this).val();
        $("#seek").attr("max", song.duration);
    });

    // seek indicator moving with song
    $(song).bind('timeupdate', function() {
        var currTime = song.currentTime;
        var duration = song.duration;
        var rem = parseInt(duration - currTime, 10);
        slider.value = (currTime/duration)*slider.max;

        pos = (currTime / duration) * 100,
        mins = Math.floor(rem/60,10),
        secs = rem - mins*60;
                    
        timeLeft.innerText = '-' + mins + ':' + (secs > 9 ? secs : '0' + secs);
    });

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

            song.volume = value*1.0/100;
  
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
