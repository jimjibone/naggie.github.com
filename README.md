This is my personal website, with a nice article engine that is able to load
RSS, HTML or Markdown. 

A manifest of articles per page is now possible.

Everything is under GPLv2 unless otherwise specified.


# Articles

Add `<article />` tags to create a new page linked on the nav bar. Set the following attributes:

  * `data-name`     : The article title (appears on nav bar)
  * `data-hint`     : short description (appears above article and button mouseover)
  * `data-type`     : markdown/html/rss/atom/manifest (from file extension by default)
  * `data-src`      : URL to source file. Same origin policy applies.
  * `data-download` : Link to associated file. Defaults to RSS feed if any.

# Blog

Blog parser expects a JSON (newest first) array of objects with the following attributes:

  * `src`    : **source URL of markdown article. Required. Relative to directory of manifest file**
  * `date`   : **a date javascript can understand with Date() object. Optional but recommended.**
  * `title`  : Optional, defaults to filename from Source
  * `author` : Optional name

The manifest is automatically generated using git history by `blog/generate.sh`
