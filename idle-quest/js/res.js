var deviceWidth = $(document).width();

if (deviceWidth < 768) {
	$('#game-area').attr('class', 'container-fluid');
	$('#craft-boots').append('<br>')
};