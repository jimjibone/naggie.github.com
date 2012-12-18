[Homebrew][1] is the macports alternative package manager for OS X.

![homebrew](blog/images/homebrew.png)

Learning from other package managers such as macports, apt and pacman, homebrew
uses the power of git and ruby to create a really lightweight yet customisable
and community oriented system.

It is powered completely by git for the packages. This means that anyone can
add a package to the main repository via a pull request on github. As a result,
maintenance os fast!

Packages are simple ruby class definition files. They rely on external tar
archives when compiled from source, and can also install from checksum'd binary
files. Tests are included as a requirement.

[Braumeister][2] is a great online package search system. As a alternative, the
command line client can also search.

[1]: http://mxcl.github.com/homebrew/
[2]: http://braumeister.org/
