var maxpx = $(document).height();
var widthpx = $(document).width();
var redditData = undefined;

function loadAJAX() {
	$.ajax({
	    type: 'GET', 
	    url: 'http://www.reddit.com/r/incremental_games.json', 
	    data: { get_param: 'value' }, 
	    dataType: 'json',
	    success: function (data) {
	    	redditData = data;
	    	console.info(data);
	    	setupPage();
	    },
	    error: function(data) {
	    	console.log('error while loading JSON');
	    }
	})
};

function setupPage() {
	console.info("RReader - Page init");
	var a = redditData.data.children;
	for (var i = 0; i < a.length; i++) {
		var b = a[i];

		$("#well-reddit-content").append('<div id="reddit-thumbnail-' + i + '" class="reddit-thumbnail"></div>');
		$("#reddit-thumbnail-" + i).append('<h3 class="reddit-thumbnail-title">' +
				'<span id="reddit-thumbnail-label-' + i + '" class="label label-none">' +
					b.data.link_flair_text +
				'</span> ' +
					'<a target="_blank" href="http://reddit.com' + b.data.permalink + '">' + b.data.title + '</a>' +
			'</h3>');
		$("#reddit-thumbnail-" + i).append('<h4 class="reddit-thumbnail-infos">' +
			'Posted by <a target="_blank" href="http://reddit.com/user/' + b.data.author + '">/u/' + b.data.author  + '</a>' +
			'<span class="pull-right"><i class="icon ion-arrow-up-c orange"></i> ' + b.data.score + '</span>' +
		'</h4>');
		$("#reddit-thumbnail-" + i).append('<h5 class="reddit-thumbnail-comments">' +
			b.data.num_comments +
		' comments</h5>');
		$("#reddit-thumbnail-" + i).append('<div class="reddit-thumbnail-spacer"></div>');
		labelChanger(b, i);
	};
};

function labelChanger(data, index) {
	if (data.data.link_flair_text == "Game")
		$("#reddit-thumbnail-label-" + index).removeClass('label-none').addClass('label-game');
	if (data.data.link_flair_text == "Meta")
		$("#reddit-thumbnail-label-" + index).removeClass('label-none').addClass('label-meta');
	if (data.data.link_flair_text == "Request")
		$("#reddit-thumbnail-label-" + index).removeClass('label-none').addClass('label-request');
	if (data.data.link_flair_text == "Idea")
		$("#reddit-thumbnail-label-" + index).removeClass('label-none').addClass('label-idea');
	if (data.data.link_flair_text == "Prototype")
		$("#reddit-thumbnail-label-" + index).removeClass('label-none').addClass('label-prototype');
	if (data.data.link_flair_text == "Development")
		$("#reddit-thumbnail-label-" + index).removeClass('label-none').addClass('label-dev');
	if (data.data.link_flair_text == "Android")
		$("#reddit-thumbnail-label-" + index).removeClass('label-none').addClass('label-android');
	if (data.data.link_flair_text == "iOS")
		$("#reddit-thumbnail-label-" + index).removeClass('label-none').addClass('label-ios');
	if (data.data.link_flair_text == "Update")
		$("#reddit-thumbnail-label-" + index).removeClass('label-none').addClass('label-update');
};

function resize() {
	$("#well-reddit-content").css('max-height', (maxpx - 200) + 'px');
	$("#well-reddit-content").css('overflow-y', 'auto');
};

function init() {
	console.info('RReader - init');
	resize();
	loadAJAX();
};