$(document).ready(function(){
    $("#join_button").click(function(e) {
          console.log(document.getElementById('exampleInputEmail1').value);
    	  if (document.getElementById('exampleInputEmail1').value === 'XH53DJ') {
    	  	  e.preventDefault();
		      localStorage['isHost'] = false;
		      window.location.replace('/main');	
    	  } else {
    	  	 alert('Invalid party code!');
    	  }
	      
    });

     $("#create_button").click(function(e) {
	      e.preventDefault();
	      localStorage['isHost'] = true;
	      window.location.replace('/login');
    });
});
