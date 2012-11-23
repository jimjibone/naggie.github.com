// Copyright Callan Bryant 2011-2012 <callan.bryant@gmail.com> http://callanbryant.co.uk
// All rights reserved.
function engine(options) {
	var md = new Showdown.converter()

	// defaults
	if (!options.type && options.src)
		if (options.src.match('\.md$') )
			options.type = 'markdown'
		else if (options.src.match('\.html$') )
			options.type = 'html'
		else if (options.src.match('rss|atom$') )
			options.type = 'rss'
		else if (options.src.match(/manifest\.json$/) )
			options.type = 'blog'

	if (!options.src)
		return console.log('src required', options)

	if (!options.target)
		return console.log('target DOM element required', options)
	else
		// ensure jQuery
		options.target = $(options.target)

	this.target = options.target

	var roster = []

	// lock to render only one at a time during infinite scroll
	var busy  = false
	var ready = false

	// PARSERS, GIVEN A URL, MUST RETURN AN ARRAY OF OBJECTS TO THE GIVEN CALLBACK:
	//
	//   {
	//      title  : optional,
	//	url    : optional,
	//      html   : string or false on error,
	//      date   : date published. Optional,
	//      author : name of publisher. Optional
	//   }
	// Single articles will return a 1-item array. blogs and feeds, multi.
	// This is known as a roster
	// Problem? call back with (false,error)
	// given src, relative dir
	// OR CALLBACK RETURNING ITEM FOR DEFERRED RENDERING
	var parsers = {}

	// use the google RSS->JSONP feed API to get an RSS feed cross-domain
	parsers.rss = parsers.atom = function(src,callback) {
		$.ajax({
			url      : 'https://ajax.googleapis.com/ajax/services/feed/load',
			data     : { v:'1.0', q: src , num: -1},
			type     : 'GET',
			dataType : 'jsonp',
			error    : function(xqHXR,stat,err) { callback(stat) },
			success  : function(res) {
				if (res.responseDetails)
					return console.log(res.responseDetails)

				var entries = res.responseData.feed.entries
				var roster = []
				for (var i in entries)
					roster[i] = {
						title  : entries[i].title,
						url    : entries[i].link,
						html   : entries[i].content,
						date   : entries[i].publishedDate,
						author : entries[i].author,
						type   : 'blog'
					}

				callback(roster)
			}
		})
	}

	// JSON manifest of markdown blog articles: array of ojects detailing
	// src (rel. to manifest), title (optional), author (optional), date (optional)
	parsers.blog = function(src,callback) {
		$.ajax({
			url: src,
			success : function(blog) {
				var dir = src.replace(/[^\/]*$/,'')

				var roster = []

				for (var i in blog) {
					// paths relative to blog
					blog[i].src = dir + blog[i].src

					// set a callback for each roster item pre-programmed to return that particular item using a
					// closure to fix reference problems http://stackoverflow.com/questions/2900839/how-to-structure-javascript-callback-so-that-function-scope-is-maintained-proper
					roster[i] = (function(meta){
						return function(callback) {
							parsers.markdown(meta.src,function(roster) {
								roster[0].type = 'blog'

								// other defaults
								// default to filename if title is not given
								if (!meta.title)
									roster[0].title = meta.src.match(/([^\/]+)\.[^.]+$/)[1]
								else
									roster[0].title = meta.title

								roster[0].date   = meta.date
								roster[0].author = meta.author

								callback(roster[0])
							})
						}
					})(blog[i])
				}

				callback(roster)
			},
			error    : function(xqHXR,stat,err) { callback(stat) },
			dataType : 'json'
		})

	}

	parsers.raw = parsers.html = function(src,callback) {
		$.ajax({
			url      : src,
			dataType : 'html',
			error    : function(xqHXR,stat,err) { callback(stat) },
			success  : function(res) {
				callback([{ html: res }])
			}
		})
	}

	parsers.markdown = function(src,callback) {
		parsers.raw(src,function(roster){
			// convert markdown to HTML
			roster[0].html = md.makeHtml(roster[0].html)

			// TODO convert relative links to that of URL  (via this.dir is multi-instantiation is used)

			callback(roster)
		})
	}

	// renderer. Given an item from a renderer and a jQuery DOM object to append to.
	// When engine is instantited (DOM must be ready) infinite scrolling is handled.
	// expects one item from the array. Can be object or callback defering object.
	var render = this.render = function() {
		if (!roster.length) return

		busy = true

		var section = $('<section />').appendTo(options.target)

		var load = roster.shift()

		// convert item into callback
		if (typeof load == 'object') {
			// IMMEDIATE RENDERING
			// load is actually an item
			var item = load
			var load = function(callback){
				callback(item)
			}
		} else
			// DEFERRED RENDERING
			// section onto targer
			// apply loading gif which will be replaced with this item
			section.html('<div class="throbber"></div>')


		// load the item
		load(function(item) {
			section.html(item.html).addClass(item.type)
			var h1 = $('<h1 />').prependTo(section)
				.text(item.title)

			if (item.title)
				section.append('<hr />')

			if (item.url) {
				var a = $('<a />').attr('href',item.url)
				h1.wrapInner(a)
			}

			if (item.date)
				$('<time />').attr('datetime', item.date)
					.text( relativeDate( new Date(item.date) ) )
					.appendTo(h1)

			if (item.author)
				$('<span />').addClass('note')
					.text(' by ').append(item.author)
					.appendTo(h1)

			// syntax highlighting
			$('pre code',section).each(function(i, e) {hljs.highlightBlock(e)})

			busy = false
		})
	}

	// decide wether to render (infinite scrolling)
	// a previous article must be visible and loaded first
	var evaluate = this.evaluate = function(items) {
		// test if last post has finished loading and initial parse has run
		if (busy || !ready) return

		// must be visible (eg, another tab might be selected)
		if (!$('section:visible',options.target).length) return

		// no more to render? disable infinite scrolling.
		if (roster.length == 0)
			return $(window).unbind('scroll',evaluate)

		// test if last article is in view
		if ($(window).scrollTop() > $('section',options.target).last().offset().top - $(window).height() ) {
			render()
		}
	}


	// every minute, update relative dates
	setInterval( function() {
		$('time[datetime]',options.target).each(function(){
			var absdate = new Date( $(this).attr('datetime') )
			$(this).text( relativeDate(absdate) )
		})
	} ,30000)


	// after initial load
	parsers[options.type](options.src,function(items){
		roster = items

		// empty the render area (may be a problem later, if recursive manifests are enabled)
		// because there may be a throbber or something there.
		options.target.empty()

		// initialise infinite scroll event handlers (they unbind when finished)
		$(window).scroll(evaluate)

		// render one item
		render()
		ready = true
	})


}
