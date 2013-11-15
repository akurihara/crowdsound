$(document).ready(function(){
	$('.search-result').hide();

	$('#search-box')[0].onkeypress = function (event) {
    	$('.search-result').show();
  	};
});