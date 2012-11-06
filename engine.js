// Copyright Callan Bryant 2011-2012 <callan.bryant@gmail.com> http://callanbryant.co.uk
// All rights reserved.

//var converter = new Showdown.converter();
$(function(){
	// apply loading gif to each external external article prior to load.
	$('article[data-src]').html('<div class="throbber"></div>');

	generateNav();

	$('#backdrop > img').hide().bind("load",function(){
		$(this).fadeIn(3500);
		// now is a good time to preload any articles
		preloadArticles();
	});

	$('article .logos img').css('opacity',0).load(function(){
		$(this).fadeTo('fast',0.7);
	});

	$('#contact').hide();

	var hideQuote = function(){
		$('#logo .quote').stop().fadeOut();
		$('#logo h1').stop().animate({'margin-top':'50px'});
	};

	setTimeout(function(){
		hideQuote();
		$('#logo').bind('mouseleave',hideQuote);
	},4000);

	$('#logo').bind('mouseenter',function(){
		$('#logo .quote').stop().fadeIn();
		$('#logo h1').stop().animate({'margin-top':'26px'});
	});

	

	var contactTimeout = setTimeout(function(){
		$('#contact').hide().fadeIn();
	},6000);

	$(window).one('scroll',function(){
		clearTimeout(contactTimeout);
		$('#contact').fadeIn();
	});


	// IE9 hack
	// the load event does not always fire due to caching, 
	// so trigger it manually...
	if($.browser.msie && parseInt($.browser.version) >= 9 )
		setTimeout(function(){
			$('img').trigger('load');
		},3000);

	// left/right select service
	$(document).bind('keydown',"right",function(){
		// check to see if a service has been active
		if (!$('.service').hasClass('active'))
			var next = $('.service').first();
		else
			var next = $('.active').next();

		next.each(showThisArticle);
	});
	$(document).bind('keydown',"left",function(){
	// check to see if a service has been active
		if (!$('.service').hasClass('active'))
			var next = $('.service').first();
		else
			var next = $('.active').prev();

		next.each(showThisArticle);
	});

	// enter to go to the URL of the active service
	$(document).bind('keyup','return',function(){
		$('nav a.active').each(function(){
			// restore postion
			$('.active').css('top',0);
			// do something else using active nav link or attachedarticle
		});
	}).bind('keydown','return',function(){
		$('.active').css('position','relative').css('top','2px');
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

		var link= $("<a />").addClass('service');
		link.text(art.data('name'));
		link.appendTo('nav');
		link.click(showThisArticle);

		link.one('mouseenter',function(){
			initArticle(art);
		});

		// attach reference to element so it can be shown later
		link.data('article',art);

		// attach link
		link.attr('href',hash);

		// title (to be made nice with bootstrap tooltips or tipsy)
		link.attr('title', art.data('hint') );

		if(document.location.hash == hash)
			link.each(showThisArticle);

		// no hash or empty hash
		if (art.hasClass('default') && document.location.hash.length <=1)
			link.each(showThisArticle);
	});
}

// show article, given nav link in 'this' context
function showThisArticle()
{
	var art = $(this).data('article');

	// hide all other articles
	$('article').hide();
	// show this one
	art.show().text();

	// clear active on all other service
	$('nav .service').removeClass('active');
	// select this link 
	$(this).addClass('active');

	// update hash location (when active, not clicked)
	// also only give the default article a hash if explicitly active
	if( !art.hasClass('default') || document.location.hash)
		document.location.hash = $(this).attr('href');

	$('.articles header').html(  art.data('hint') );

	// need to init?
	//if ( !$(this).data('article').data('ready') )
		initArticle(art);
}

function preloadArticles(){
	$('article[data-preload]').each(function(){
		initArticle($(this));
	});
}

// initialise the article, given the mathing jQuery object
function initArticle(art){
	// only want to call this once...
	if (art.data('ready'))
		return false;

	// set flag so function is not called again
	art.data('ready',true);
	
	// external HTML fragment, markdown
	if ( art.data('src') ){
		if (art.data('type') == 'rss' ||  art.data('type') == 'atom')
			$.getFeed({
				url: art.data('src'),
				error:function(){
					art.text('Error retreiving feed');
				},
				success:function(feed){
					var html = feed2html(feed);
					art.html(html);
				}
			})
		else
			$.ajax({
				url: art.data('src'),
				error:function(){
					art.text('Error retrieving article');
				},
				dataType: 'html',
				success: function(html){
					if (art.data('type') == 'markdown')
						//html = converter.makeHtml(html);
						html = 'Markdown disabled';
			
					art.html(html);
					// syntax highlighting
					$('pre code',art).each(function(i, e) {hljs.highlightBlock(e)});

				}
			});
	}	
	// inline markdown
	else if(art.data('type') == 'text/x-web-markdown'){
		var html = $(art).html();
		html = converter.makeHtml(html);
		$(art).html(html);

	}

	// syntax highlighting of inline articles
	$('pre code',art).each(function(i, e) {hljs.highlightBlock(e)});
}


// given a string rss it must return some html... 
function feed2html(feed){
	var html = $('<div class="rss"></div>');

	for (var i in feed.items){
		var post = $('<div class="container_12 post"><div class="grid_10 prefix_1 suffix_1 meta"></div><div class="content grid_10 prefix_1 suffix_1"></div></div>');
		$('.meta',post).append('<h1><a href="'+feed.items[i].link+'">'+feed.items[i].title+'</a></h1>');

		var date = new Date(feed.items[i].updated);
		date = relativeDate(date);

		$('.meta h1',post).append('<span class="date">'+date+'</span>');

		$('.meta',post).append('<div class="ref">'+feed.items[i].link.replace(/http:\/\//,'').match(/[a-z0-9\.]+/i)+'</div>');

		$('.content',post).append(feed.items[i].description);
	

		html.append(post).append('<hr />');
	}

	return html;
}

// Copyright Callan Bryant 2011-2012 <callan.bryant@gmail.com> http://callanbryant.co.uk
// All rights reserved.

// from https://github.com/azer/relative-date/blob/master/lib/relative-date.js
var relativeDate = (function(undefined){

  var SECOND = 1000,
      MINUTE = 60 * SECOND,
      HOUR = 60 * MINUTE,
      DAY = 24 * HOUR,
      WEEK = 7 * DAY,
      YEAR = DAY * 365,
      MONTH = YEAR / 12;

  var formats = [
    [ 0.7 * MINUTE, 'just now' ],
    [ 1.5 * MINUTE, 'a minute ago' ],
    [ 60 * MINUTE, 'minutes ago', MINUTE ],
    [ 1.5 * HOUR, 'an hour ago' ],
    [ DAY, 'hours ago', HOUR ],
    [ 2 * DAY, 'yesterday' ],
    [ 7 * DAY, 'days ago', DAY ],
    [ 1.5 * WEEK, 'a week ago'],
    [ MONTH, 'weeks ago', WEEK ],
    [ 1.5 * MONTH, 'a month ago' ],
    [ YEAR, 'months ago', MONTH ],
    [ 1.5 * YEAR, 'a year ago' ],
    [ Number.MAX_VALUE, 'years ago', YEAR ]
  ];

  function relativeDate(input,reference){
    !reference && ( reference = (new Date).getTime() );
    reference instanceof Date && ( reference = reference.getTime() );
    input instanceof Date && ( input = input.getTime() );
    
    var delta = reference - input,
        format, i, len;

    for(i = -1, len=formats.length; ++i < len; ){
      format = formats[i];
      if(delta < format[0]){
        return format[2] == undefined ? format[1] : Math.round(delta/format[2]) + ' ' + format[1];
      }
    };
  }

  return relativeDate;

})();

if(typeof module != 'undefined' && module.exports){
  module.exports = relativeDate;
}

