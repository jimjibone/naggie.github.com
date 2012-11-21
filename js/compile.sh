#!/bin/bash

# Compiles all javascript into one file. Using google closure-compiler (homebrew package for Mac OS X)
# Does not include jquery. Use google api to load async.

cd $(dirname "$0")

closure-compiler \
	--js src/showdown.js \
	--js src/jquery.hotkeys.js \
	--js src/relativeDate.js \
	--js src/engine.js \
	--js src/client.js \
	--js src/highlight.pack.js \
	--js_output_file build.js  # --compilation_level WHITESPACE_ONLY

exit

# debug mode
(
	cat src/showdown.js
	cat src/jquery.hotkeys.js
	cat src/relativeDate.js
	cat src/engine.js
	cat src/client.js
	cat src/highlight.pack.js
) > build.js
