var $ = require('jQuery')

// TODO: select a target on Instantiation?
// This way infinite scrolling could be much more clever. And also only enable itself conditionally.
// perhaps instantiate with URL?
// or look for tagets with 'engine' class, for attached engine object with roster
function engine() {

	// initialise infinite scroll event handlers
	//$(window).scroll(this.continue)

	// PARSERS, GIVEN A URL, MUST RETURN AN ARRAY OF OBJECTS TO THE GIVEN CALLBACK:
	//
	//   {
	//      title  : optional,
	//	url    : optional,
	//      html   : string or callback returning string or false on error,
	//      date   : date published. Optional,
	//      author : name of publisher. Optional
	//   }
	// Single articles will return a 1-item array. Manifests and feeds, multi.
	// This is known as a roster
	// Problem? call back with (false,error)
	this.parsers = {}

	// use the google RSS->JSONP feed API to get an RSS feed cross-domain
	this.parsers.rss = function(src,callback) {
		$.ajax({
			url      : 'https://ajax.googleapis.com/ajax/services/feed/load',
			data     : { v:'1.0', q: src },
			type     : 'GET',
			dataType : 'json',
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

	this.parsers.manifest = function(src) {

	}

	this.parsers.markdown = function(src) {

	}

	this.parsers.html = function(src) {

	}

	// renderer. Given an item from a renderer and a jQuery DOM object to append to.
	// When engine is instantited (DOM must be ready) infinite scrolling is handled.
	// expects one item from the array.
	this.render = function(items,target) {}




	// Callbacks are deferred until they are needed to render (eg: infinite scrolling)
	// Renders until first callback object is founf



	// will continue to render more items if appropriate
	// a previous article must be visible and loaded first
	// expects one item from the array.
	// Looks for section parents
	// TODO: or known targets
	this.icontinue = function() {

/*
		if (!$('section:visible').length) return
		// test if last post has finished or not
		if ($('section').last().data('loading') ) return

		// test if last article is in view
		if ($(window).scrollTop() > $('section').last().offset().top - $(window).height() ) {
			var art  = $('nav a.active').data('article')
			if (!art.data('manifest')) return
			var meta = art.data('manifest').shift()

			// no moar articles?
			if (!meta) return

			render(meta,art)
		}

*/
	}
}

var e = new engine()
e.parsers.rss('http://callanbryant.wordpress.com/feed/', function(roster){
	roster.forEach(function(item){
		console.log(item.title)
	})
})
