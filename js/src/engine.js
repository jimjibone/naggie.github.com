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
	parsers.rss = function(src,callback) {
		$.ajax({
			url      : 'https://ajax.googleapis.com/ajax/services/feed/load',
			data     : { v:'1.0', q: src , num: -1},
			type     : 'GET',
			dataType : 'jsonp',
			error    : function(xqHXR,stat,err) { callback(stat) },
			success  : function(res) {
				var entries = res.responseData.feed.entries
				var roster = []
				for (var i in entries)
					roster[i] = {
						title  : entries[i].title,
						url    : entries[i].url,
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
					roster[i] = (function(src){
						return function(callback) {
							parsers.markdown(src,function(roster) {
								roster[0].type = 'blog'

								// other defaults
								// default to filename if title is not given
								if (!roster[0].title)
									roster[0].title = src.match(/([^\/]+)\.[^.]+$/)[1]

								callback(roster[0])
							})
						}
					})(blog[i].src)
				}

				callback(roster)
			},
			error    : function(xqHXR,stat,err) { callback(stat) },
			dataType : 'json'
		})

	}

	parsers.raw = function(src,callback) {
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
			roster[0].html = converter.makeHtml(roster[0].html)

			// TODO convert relative links to that of URL  (via this.dir is multi-instantiation is used)

			callback(roster)
		})
	}

	parsers.html = parsers.raw

	// renderer. Given an item from a renderer and a jQuery DOM object to append to.
	// When engine is instantited (DOM must be ready) infinite scrolling is handled.
	// expects one item from the array. Can be object or callback defering object.
	var render = this.render = function() {
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


	this.evaluate = function(items) {
		// test if last post has finished loading and initial parse has run
		if (busy || !ready) return

		// must be visible (eg, another tab might be selected)
		if (!$('section:visible',options.target).length) return

		// no more to render? disable infinite scrolling.
		if (roster.length == 0)
			return //$(window).unbind('scroll',this)

		// test if last article is in view
		if ($(window).scrollTop() > $('section',options.target).last().offset().top - $(window).height() ) {
			render()
		}
	}


	// will continue to render more items if appropriate
	// a previous article must be visible and loaded first
	// initialise infinite scroll event handlers
	$(window).scroll(this.evaluate)

	// every minute, update relative dates
	setInterval( function() {
		$('time[datetime]',options.target).each(function(){
			var absdate = new Date( $(this).attr('datetime') )
			$(this).text( relativeDate(absdate) )
		})
	} ,30000)


	parsers[options.type](options.src,function(items){
		roster = items

		// render one item
		render()
		ready = true
	})


}

setTimeout(function(){
	new engine({
		target: $('nav a.active').data('article').empty(),
		src: 'blog/manifest.json'
	})
},2000)