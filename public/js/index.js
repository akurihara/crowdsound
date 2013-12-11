$(document).ready(function(){
    $("#join_button").click(function(e) {
	      e.preventDefault();
	      localStorage['isHost'] = false;
	      window.location.replace('/main');
    });

     $("#create_button").click(function(e) {
	      e.preventDefault();
	      localStorage['isHost'] = true;
	      window.location.replace('/login');
    });
});
