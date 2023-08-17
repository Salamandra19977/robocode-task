$('.toggleNav').click(function(){
	$('.flex-nav ul').toggle();
});

$('.content p').click(function(){
	$('#logo').toggle();
	$('.docker').toggle();
});

$('#logo').hover(
	function(){
        $(this).css({transform : 'rotate(-30deg)'});
        $('body').css({background: 'yellow'});
        $('footer').css({background: 'green'});
    },
    function() {
        $(this).css({transform : 'rotate(0deg)'});
        $('body').css({background: 'white'});
        $('footer').css({background: 'darkred'});
    }
);

$('header p').hover(
	function(){
        $(this).css({fontSize : '35px'});
    },
    function() {
        $(this).css({fontSize : '30px'});
    }
);


