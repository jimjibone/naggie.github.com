# Ideas, may or may not be implemented.

HTML5 all tags for sematics (article to section?)

attribute libs
load on demand option
mobile site
pack all JS
litter profile with logos from products, companies, used and created
sized with fadein class like ptb
with disclaimer

disqus

popovers for article links http://onehackoranother.com/projects/jquery/tipsy/#options
to be manually fired in specific order on load, moving CB logo 
to show a 128x128 icon, as a preview


# Logos
  * node  * 
bcrm
git
html5
css3
uol
php

integrate linkedin
make adaptive with adapt.js, making top links blocks, removing banner, etc
possible carousel a top
make page loader inot jquery plugin so it can be used for portal
optional mathjax support
dynamic JS loading: eg only load syntax highlighter when code is there
starred items RSS feed
logos fadein on load:
Items in list form should always be in <ul>, <ol>, or <dl>, Never a set of <div> or <p> nav
no ;
highlight/link keywords
font/placement
id to anything within an article should be overriden so it works
for blog: regarding game engines and open source
RSS
 <link rel="alternate" type="application/rss+xml" title="RSS" href="http://gimp.lisanet.de/Website/News/rss.xml" />
$('#logo #quote').css('position','relative').animate({top:100,opacity:0},'slow');$('#logo h1').css('position','relative').animate({bottom:100},500)
changing header on mouseover and choose
RSS mimetype option for article loafer
with simple cron/wget local downloader, also for starred items

or amke own like
 68 $.get('starred.rss', function(data) {
 69     var $xml = $(data);
 70     $xml.find("item,entry").each(function() {
 71         var $this = $(this),
 72             item = {
 73                 title: $this.find("title").text(),
 74                 link: $this.find("link").text(),
 75                 description: $this.find("description,summary").text(),
 76                 pubDate: $this.find("pubDate").text(),
 77                 author: $this.find("author").text()
 78         }
 79 
 80         var html = '<h2>'+item.title+'</h2><p>'+item.description+'</p>'
 81         $('article').append(html);
 82     });
 83 });


HINT TO ARTICLE HEADER


relative dates for rss (auto update?)