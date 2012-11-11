Hopefully you’re reading this blog from <http://callanbryant.co.uk/> rather than wordpress.

My new website engine is now able to read RSS feeds thanks to the incredibly easy-to-use jFeed. This was after writing my own (jQuery based) parser which worked, but supporting the inconsistencies of RSS or ATOM was not worth the bother.

![Website engine](blog/images/engine.png)

The engine automatically integrates articles, linking to them on the nav bar above; supporting embedded or external source in HTML, markdown or RSS.

Preloading is handled, too. The jQuery based article engine will be open-sourced when I have time to package it as a proper jQuery module.

