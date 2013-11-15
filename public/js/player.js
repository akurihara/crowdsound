	$(document).ready(function() {

		// set play button
		playBtn = document.getElementById('play');
		playBtn.style.backgroundImage = "url(../public/img/play.png)";

		slider = document.getElementById('seek');
		timeLeft = document.getElementById('timeLeft');
		song = new Audio('../public/audio/I\'m_Gonna_Be.mp3');
		song.volume = .35;
		duration = song.duration;

		isPlaying = false;

		// play button functionality
		$('#play').click(function() {
			if (!isPlaying) {
				isPlaying = true;
				playBtn.style.backgroundImage = "url(../public/img/pause.png)";
				song.play();
			} else {
				isPlaying = false;
				playBtn.style.backgroundImage = "url(../public/img/play.png)";
				song.pause();
			}
		});

		// seek bar functionality
		$("#seek").bind("change", function() {
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

	});