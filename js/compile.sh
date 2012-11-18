#!/bin/bash

# Compiles all javascript into one file. Using google closure-compiler (homebrew package for Mac OS X)
# Does not include jquery. Use google api to load async.

closure-compiler \
	--js src/showdown.js \
	--js src/jquery.hotkeys.js \
	--js src/jquery.jfeed.pack.js \
	--js src/relativeDate.js \
	--js src/engine.js \
	--js src/client.js \
	--js src/highlight.pack.js \
	--js_output_file build.js # --compilation_level WHITESPACE_ONLY
