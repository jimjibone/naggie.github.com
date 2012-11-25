#!/bin/bash

# Compiles all css into one file. Using css-crush (homebrew package for Mac OS X)

cd $(dirname "$0")


LEVEL=SIMPLE_OPTIMIZATIONS
#LEVEL=WHITESPACE_ONLY

# csscrush is stupid and written in PHP, so it does not understand multiple input files...
TMPFILE=$(mktemp -t banana)

cat \
	src/solarized_light.css \
	src/960_12_col.css \
	src/main.css \
	> $TMPFILE

if [ ! $DEBUG ]; then
	csscrush -f $TMPFILE -o build.css
else
	cp $TMPFILE build.css
fi

rm $TMPFILE
