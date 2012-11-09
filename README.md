This is my personal website, with a nice article engine that is able to load
RSS, HTML or Markdown. 

A manifest of articles per page is now possible.

Everything is under GPLv2 unless otherwise specified.


# Articles

Add `<article />` tags to create a new page linked on the nav bar. Set the following attributes:

  * data-name : The article title (appears on nav bar)
  * data-hint : short description (appears above article and button mouseover)
  * data-type : markdown/html/rss/atom/manifest (defaults to HTML)
  * data-src  : URL to source file. Same origin policy applies.

# Manifest

Use a manifest to specify multiple articles for one page. This is useful for a blog.

Manifest parset expects a JSON (newest first) array of objects with the following attributes:

  * src    : source URL of article. Required.
  * title  : Optional, defaults to filename from Source
  * date   : a date javascript can understand with Date() object. Optional but recommended.
  * hash   : a hash for caching. Defaults to date. Optional.
  * author : Optional name
  * type   : Optional, defaults to markdown.

  A manifest generator that uses git history is in development.
