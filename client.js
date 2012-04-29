// Copyright Callan Bryant 2011 <callan.bryant@gmail.com> http://callanbryant.co.uk
$(function(){
	generateNav();
	loadArticles();

	$('#backdrop > img').hide().bind("load",function(){
		$(this).fadeIn(3500);
	});

	$('#contact').delay(4000).hide().fadeIn();

	// IE9 hack
	// the load event does not always fire due to caching, 
	// so trigger it manually...
	if($.browser.msie && parseInt($.browser.version) >= 9 )
		setTimeout(function(){
			$('img').trigger('load');
		},3000);

	// left/right select service
	$(document).bind('keydown',"right",function(){
		// check to see if a service has been selected
		if (!$('.service').hasClass('selected'))
			var next = $('.service').first();
		else
			var next = $('.selected').next();

		next.each(loadThisArticle);
	});
	$(document).bind('keydown',"left",function(){
	// check to see if a service has been selected
		if (!$('.service').hasClass('selected'))
			var next = $('.service').first();
		else
			var next = $('.selected').prev();

		next.each(loadThisArticle);
	});

	// enter to go to the URL of the selected service
	$(document).bind('keyup','return',function(){
		$('nav a.selected').each(function(){
			// restore postion
			$('.selected').css('top',0);
			// do something else using selected nav link or attachedarticle
		});
	}).bind('keydown','return',function(){
		$('.selected').css('position','relative').css('top','2px');
	});
	
});

// create elements representing pages
// with attached  events
function generateNav()
{
	$('nav').empty();
	$('article[data-name]').each(function(index,art){
		// jquery-ify
		art = $(art);

		var el = $("<a />").addClass('service');
		el.text(art.data('name'));
		el.appendTo('nav').hide().fadeIn();
		el.click(loadThisArticle);

		// attach reference to element so it can be shown later
		el.data('article',art);

		if (art.hasClass('default'))
			el.each(loadThisArticle);
	});
}

function loadThisArticle()
{
	// hide all other articles
	$('article').hide();
	// show this one
	$(this).data('article').show().text();

	// clear selected on all other service
	$('nav .service').removeClass('selected');
	// select this service
	$(this).addClass('selected');
}

// loads all articles. Maybe on demand later, if the site grows too much.
function loadArticles(){
	// apply loading gif to each
	$('article[data-src]').html('<div class="throbber"></div>');

	$('article[data-src]').each(function(i,art){
		art = $(art);
		
		$.ajax({
			url: art.data('src'),
			error:function(){
				art.text('Error retrieving article.');
			},
			dataType: 'html',
			success: function(html){
				art.html(html);
			}
		});
	});
}

// Copyright Callan Bryant 2011-2012 <callan.bryant@gmail.com> http://callanbryant.co.uk
