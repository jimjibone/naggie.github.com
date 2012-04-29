// Copyright Callan Bryant 2011-2012 <callan.bryant@gmail.com> http://callanbryant.co.uk
// All rights reserved.
var converter = new Showdown.converter();
$(function(){
	// apply loading gif to each external article prior to load.
	$('article[data-src]').html('<div class="throbber"></div>');

	loadArticles();

	generateNav();

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

		// safe URL hash for link
		var hash = '#'+art.data('name').replace(/[^0-9a-z]+/gi,'-');

		var el = $("<a />").addClass('service');
		el.text(art.data('name'));
		el.appendTo('nav');
		el.click(loadThisArticle);

		// attach reference to element so it can be shown later
		el.data('article',art);

		// attach link
		el.attr('href',hash);
		
		if(document.location.hash == hash)
			el.each(loadThisArticle);

		// no hash or empty hash
		if (art.hasClass('default') && document.location.hash.length <=1)
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

	// update hash location (when selected, not clicked)
	// also only give the default article a hash if explicitly selected
	if( !$(this).data('article').hasClass('default') || document.location.hash)
		document.location.hash = $(this).attr('href');
}

// loads all articles. Maybe on demand later, if the site grows too much.
function loadArticles(){
	$('article[data-src]').each(function(i,art){
		art = $(art);
		
		$.ajax({
			url: art.data('src'),
			error:function(){
				art.text('Error retrieving article.');
			},
			dataType: 'html',
			success: function(html){
				if (art.data('language') == 'text/x-web-markdown')
					html = converter.makeHtml(html);
					
				art.html(html);
				// syntax highlighting
				$('pre code',art).each(function(i, e) {hljs.highlightBlock(e)});
			}
		});
	});
	
	// select inline markdown
	$('article[data-language="text/x-web-markdown"]:not(article[data-src])').each(function(i,art){
		var html = $(art).html();
		html = converter.makeHtml(html);
		$(art).html(html);
	});
	// syntax highlighting of inline articles
	$('article pre code').each(function(i, e) {hljs.highlightBlock(e)});
}

// Copyright Callan Bryant 2011-2012 <callan.bryant@gmail.com> http://callanbryant.co.uk
// All rights reserved.
