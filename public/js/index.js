$(document).ready(function(){
    $(".join_button").click(function(e) {
        e.preventDefault();
        $.get('/main', function(data) {
            console.log(data);
        });
    });
});
