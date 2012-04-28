// Copyright Callan Bryant 2011 <callan.bryant@gmail.com> http://callanbryant.co.uk
$(function(){
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

	// load the list of pages
	$.ajax({
		url: "pages.json",
		error:function(){
			$('nav').text('Error retrieving pages');
		},
		dataType: 'json',
		success: listPages
	});

	// left/right select service
	$(document).bind('keydown',"right",function(){
		// check to see if a service has been selected
		if (!$('.service').hasClass('selected'))
			var next = $('.service').first();
		else
			var next = $('.selected').next();

		next.each(selectThisPage);
	});
	$(document).bind('keydown',"left",function(){
	// check to see if a service has been selected
		if (!$('.service').hasClass('selected'))
			var next = $('.service').first();
		else
			var next = $('.selected').prev();

		next.each(selectThisPage);
	});
/*
	// enter to go to the URL of the selected service
	$(document).bind('keyup','return',function(){
		if ($('.selected').length)
		{
			var name = $('.selected').text();
			var url  = $('.selected').data('url');
			message();

			// restore postion
			$('.selected').css('top',0);

			// stays this way if browser goes back to the page
			//$('nav').text("Loading "+name+"...");
			document.location = url;
		}
	}).bind('keydown','return',function(){
		$('.selected').css('position','relative').css('top','2px');
	});
*/	
});

// create elements representing pages
// with attached data and events
function listPages(pages)
{
	$('nav').empty();
	$.each(pages,function(name,ob){
		var el = $("<a />").addClass('service');
		//el.attr('href','#'); // makes doc scroll up. bad.
		el.text(name);
		el.appendTo('nav').hide().fadeIn();
		el.click(selectThisPage);
		el.data('description',ob.description);
		el.data('url',ob.url);
		el.data('hotkey',ob.hotkey);

		// hotkey
		if (ob.hotkey)
			$(document).bind('keydown',ob.hotkey,function(){
				el.each(selectThisPage);
			});

		if (ob.primary)
			el.each(selectThisPage);
	});
}

function selectThisPage()
{
	// make noise
	//document.getElementById('selectSound').play();

	var name = $(this).text();
	var url = $(this).data('url');
	var desc = $(this).data('description');
	var key = $(this).data('hotkey');

	if (!url) url = '';

	// put in description area
	var converter = new Showdown.converter();
	var html = converter.makeHtml(desc);
	$('#description').html(html);

	$('article > a.main').attr('href',url).text(url);

	if (url && key)
		message('Press enter to visit '+name+', '+key.toUpperCase()+' to re-select it');
	else if(url && !key)
		message('Pressing enter visits '+name);
	else if(key)
		message('Pressing '+key.toUpperCase()+' selects '+name);

	// clear selected on all other service
	$('nav .service').removeClass('selected');
	// select this service
	$(this).addClass('selected');
}


// Copyright Callan Bryant 2011-2012 <callan.bryant@gmail.com> http://callanbryant.co.uk
