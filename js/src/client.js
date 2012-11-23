// Copyright Callan Bryant 2011-2012 <callan.bryant@gmail.com> http://callanbryant.co.uk
// All rights reserved.

$(function(){
	generateNav()
	animations() // also preloads when appropriate
	hotkeys()
})

// create elements representing pages
// with attached events
function generateNav()
{
	$('nav').empty()
	$('article[data-name]').each(function(index,art){
		// jquery-ify
		art = $(art)

		// safe URL hash for link
		var hash = '#'+art.data('name').replace(/[^0-9a-z]+/gi,'-')

		var link = $("<a />").addClass('service')
		link.text(art.data('name'))
		link.appendTo('nav')
		link.click(showThisArticle)

		link.one('mouseenter',function() {
			initArticle(art)
		})

		link.data('article',art)

		// attach link
		link.attr('href',hash)

		// download associated file (linked later)
		// set default to feed if type is RSS
		if (!art.data('download') && art.data('type') )
			if ( art.data('type').match(/rss|atom/) )
				art.data('download', art.data('src') )

		// title (to be made nice with bootstrap tooltips or tipsy)
		link.attr('title', art.data('hint') )

		if(document.location.hash == hash)
			link.each(showThisArticle)

		// no hash or empty hash
		if (art.hasClass('default') && document.location.hash.length <=1)
			link.each(showThisArticle)
	})
}

// show article, given nav link in 'this' context
function showThisArticle()
{
	var art = $(this).data('article')

	// hide all other articles
	$('article').hide()
	// show this one
	art.show().text()

	// clear active on all other service
	$('nav .service').removeClass('active')
	// select this link
	$(this).addClass('active')

	// update hash location (when active, not clicked)
	// also only give the default article a hash if explicitly active
	if( !art.hasClass('default') || document.location.hash)
		document.location.hash = $(this).attr('href')

	$('.articles header').html(  art.data('hint') )

	// need to init? (automatic now)
	//if ( !$(this).data('article').data('ready') )
		initArticle(art)
}

function preloadArticles(){
	$('article[data-preload]').each(function(){
		initArticle($(this))
	})
}

// initialise the article, given the mathing jQuery object
function initArticle(art) {
	// only want to call this once...
	if (art.data('engine')) return false

	// no need to process inline HTML
	if (! art.data('src')) return false

	art.data('engine',new engine({
		src    : art.data('src'),
		target : art,
		type   : art.data('type')
	}))
}

function animations() {
	$('#backdrop > img').hide().bind("load",function(){
		$(this).fadeIn(3500)
		// now is a good time to preload any articles
		preloadArticles()
	})

	$('article .logos img').css('opacity',0).load(function(){
		$(this).fadeTo('fast',0.7)
	})

	$('#contact').hide()

	var hideQuote = function(){
		$('#logo .quote').stop().fadeOut()
		$('#logo h1').stop().animate({'margin-top':'50px'})
	}

	setTimeout(function(){
		hideQuote()
		$('#logo').bind('mouseleave',hideQuote)
	},4000)

	$('#logo').bind('mouseenter',function(){
		$('#logo .quote').stop().fadeIn()
		$('#logo h1').stop().animate({'margin-top':'26px'})
	})



	var contactTimeout = setTimeout(function(){
		$('#contact').hide().fadeIn()
	},6000)

	$(window).one('scroll',function(){
		clearTimeout(contactTimeout)
		$('#contact').fadeIn()
	})


	// IE9 hack
	// the load event does not always fire due to caching,
	// so trigger it manually...
	if($.browser.msie && parseInt($.browser.version) >= 9 )
		setTimeout(function(){
			$('img').trigger('load')
		},3000)


}

// map hotkeys
function hotkeys(){
	// left/right select service
	$(document).bind('keydown',"right",function(){
		// check to see if a service has been active
		if (!$('.service').hasClass('active'))
			var next = $('.service').first()
		else
			var next = $('.active').next()

		next.each(showThisArticle)
	})
	$(document).bind('keydown',"left",function(){
	// check to see if a service has been active
		if (!$('.service').hasClass('active'))
			var next = $('.service').first()
		else
			var next = $('.active').prev()

		next.each(showThisArticle)
	})

	// enter to go to the URL of the active service
	$(document).bind('keyup','return',function(){
		$('nav a.active').each(function(){
			// restore postion
			$('.active').css('top',0)
			// do something else using active nav link or attachedarticle
			var art = $(this).data('article')
			if(art.data('download'))
				window.open(art.data('download'))
		})
	}).bind('keydown','return',function(){
		$('.active').css('position','relative').css('top','2px')
	})
}

// Copyright Callan Bryant 2011-2012 <callan.bryant@gmail.com> http://callanbryant.co.uk
// All rights reserved.
