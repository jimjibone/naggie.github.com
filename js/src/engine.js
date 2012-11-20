// TODO: select a target on Instantiation?
// This way infinite scrolling could be much more clever. And also only enable itself conditionally.
// perhaps instantiate with URL?
// or look for tagets with 'engine' class, for attached engine object with roster
function engine() {

	// initialise infinite scroll event handlers
	// TODO: unbind on completion
	//$(window).scroll(this.continue)

	// showdown markdown parser
	var md = new Showdown.converter()

	// item to be rendered by renderer
	var item = function() {
		this.html = ''
		this.loaded = false

		this.load = function(callback) {

		}
	}

	// every minute, update relative dates (TODO: multi instance match current or global)
	setInterval( function() {
		$('time[datetime]').each(function(){
			var absdate = new Date( $(this).attr('datetime') )
			$(this).text( relativeDate(absdate) )
		})
	} ,30000)



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
	this.parsers = {}

	// use the google RSS->JSONP feed API to get an RSS feed cross-domain
	this.parsers.rss = function(src,callback) {
		$.ajax({
			url      : 'https://ajax.googleapis.com/ajax/services/feed/load',
			data     : { v:'1.0', q: src , num: -1},
			type     : 'GET',
			dataType : 'jsonp',
			error    : function(err) { callback(false,err) },
			success  : function(res) {
				var entries = res.responseData.feed.entries
				var roster = []
				for (var i in entries)
					roster[i] = {
						title  : entries[i].title,
						url    : entries[i].url,
						html   : entries[i].content,
						date   : entries[i].publishedDate,
						author : entries[i].author
					}

				callback(roster)
			}
		})
	}

	// JSON manifest of markdown blog articles: array of ojects detailing
	// src (rel. to manifest), title (optional), author (optional), date (optional)
	this.parsers.blog = function(src,callback) {
		$.ajax({
			url: src,
			success : function(blog) {
				dir = src.replace(/[^\/]*$/,'')

				for (var i in blog) {
					// paths relative to blog
					blog[i].src = dir + blog[i].src

					// other defaults
					// default to filename if title is not given
					if (!blog[i].title) blog[i].title = blog[i].src.match(/([^\/]+)\.[^.]+$/)[1]
				}

				callback(roster)
			},
			error    : function(err) { callback(false,err) },
			dataType : 'json'
		})

	}

	this.parsers.raw = function(src,callback) {
			$.ajax({
			url      : src,
			dataType : 'html',
			error    : function(err) { callback(false,err) },
			success  : function(res) {
				callback([{ html: res }])
			}
		})
	}

	this.parsers.markdown = function(src,callback) {
		this.parsers.raw(src,function(roster){
			// convert markdown to HTML
			roster[0].html = converter.makeHtml(roster[0].html)

			// TODO convert relative links to that of URL  (via this.dir is multi-instantiation is used)

			callback(roster)
		})
	}

	this.parsers.html = this.parsers.raw

	// renderer. Given an item from a renderer and a jQuery DOM object to append to.
	// When engine is instantited (DOM must be ready) infinite scrolling is handled.
	// expects one item from the array. Can be object or callback defering object.
	this.render = function(load,target) {

		var section = $('<section />').appendTo(article).data('loading',true)

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
		load(function(item){
			section.html(html)
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

			section.data('loading',false)
		})
	}

	// will continue to render more items if appropriate
	// a previous article must be visible and loaded first
	// expects one item from the array.
	// Looks for section parents
	// TODO: or known targets
	this.evaluate = function(items) {

/*
		if (!$('section:visible').length) return
		// test if last post has finished or not
		if ($('section').last().data('loading') ) return

		// test if last article is in view
		if ($(window).scrollTop() > $('section').last().offset().top - $(window).height() ) {
			var art  = $('nav a.active').data('article')
			if (!art.data('blog')) return
			var meta = art.data('blog').shift()

			// no moar articles?
			if (!meta) return

			render(meta,art)
		}

*/
	}
}

//var f = new engine()
//f.parsers.rss('http://www.google.com/reader/public/atom/user%2F15749961360086107608%2Fstate%2Fcom.google%2Fstarred',function(roster){
//	console.log(roster.length, roster)
//})
