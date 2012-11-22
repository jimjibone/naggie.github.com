#!/bin/bash
# Generates the manifest.json for this blog. Better re-write this in python using pygit2.
# or node using node-gitteh

# returns date a file was added to the repo, in a format JS can understand
function added {
	git log --pretty=format:"%ad" "$*" | tail -n1
}


# returns date a file was added to the repo, in unix time
function addedStamp {
	git log --pretty=format:"%at" "$*" | tail -n1
}

# returns original author of file
function author {
	git log --pretty=format:"%an" "$*" | tail -n1
}

# list files by date added to repository (newest first)
function lsChrono {
	(
		ls "$@" | while read SRC; do
			addedStamp $SRC
			echo  " $SRC"
		done
	) | sort -nr | cut -c12-
}

cd $(dirname $0)

# Manual JSON from BASH. Ugh. Impedance mismatch!
# remove trailing delimiter
(
	echo -ne [
		lsChrono *.md | while read SRC; do
			echo '{'
				echo -ne '"src":"'
					echo -ne $SRC
				echo  '",'

				echo -ne '"date":"'
					added $SRC
				echo  '",'

				echo -ne '"author":"'
					author $SRC
				echo  '"'
			echo -ne '},'
		done
	echo ]
) | sed -e 's/},]/}]/g' > manifest.json
