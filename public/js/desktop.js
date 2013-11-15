$(document).ready(function() {
		addsongBtn = document.getElementById('plus');
		searchDiv = document.getElementById('searchDiv');
		playlistDiv = document.getElementById('playlistDiv');
		
		isSearching = false;



		// play button functionality
		$('#plus').click(function() {
			if (!isSearching) {
				isSearching = true;
				addsongBtn.style.backgroundImage = "url(../public/img/playlist.png)";
				$('#searchDiv').show();
				$('#playlistDiv').hide();
			} else {
				isSearching = false;
				addsongBtn.style.backgroundImage = "url(../public/img/plus.png)";
				$('#searchDiv').hide();
				$('#playlistDiv').show();
			}
		});

		var mql = window.matchMedia("(min-width: 786px)");
		mql.addListener(handleMediaChange);
		handleMediaChange(mql);
		
		var handleMediaChange = function (mediaQueryList) {
		    if (mediaQueryList.matches) {
		    	$('#searchDiv').show();
				$('#playlistDiv').show();
		    } else {
		    	if (isSearching) {
		    		$('#playlistDiv').hide();
		    		$('#searchDiv').show();
		    	} else {
		    		$('#playlistDiv').show();
		    		$('#searchDiv').hide();
		    	}
		    }
		}

});