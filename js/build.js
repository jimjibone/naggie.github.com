//
// showdown.js -- A javascript port of Markdown.
//
// Copyright (c) 2007 John Fraser.
//
// Original Markdown Copyright (c) 2004-2005 John Gruber
//   <http://daringfireball.net/projects/markdown/>
//
// Redistributable under a BSD-style open source license.
// See license.txt for more information.
//
// The full source distribution is at:
//
//				A A L
//				T C A
//				T K B
//
//   <http://www.attacklab.net/>
//
//
// Wherever possible, Showdown is a straight, line-by-line port
// of the Perl version of Markdown.
//
// This is not a normal parser design; it's basically just a
// series of string substitutions.  It's hard to read and
// maintain this way,  but keeping Showdown close to the original
// design makes it easier to port new features.
//
// More importantly, Showdown behaves like markdown.pl in most
// edge cases.  So web applications can do client-side preview
// in Javascript, and then build identical HTML on the server.
//
// This port needs the new RegExp functionality of ECMA 262,
// 3rd Edition (i.e. Javascript 1.5).  Most modern web browsers
// should do fine.  Even with the new regular expression features,
// We do a lot of work to emulate Perl's regex functionality.
// The tricky changes in this file mostly have the "attacklab:"
// label.  Major or self-explanatory changes don't.
//
// Smart diff tools like Araxis Merge will be able to match up
// this file with markdown.pl in a useful way.  A little tweaking
// helps: in a copy of markdown.pl, replace "#" with "//" and
// replace "$text" with "text".  Be sure to ignore whitespace
// and line endings.
//
//
// Showdown usage:
//
//   var text = "Markdown *rocks*.";
//
//   var converter = new Showdown.converter();
//   var html = converter.makeHtml(text);
//
//   alert(html);
//
// Note: move the sample code to the bottom of this
// file before uncommenting it.
//
//
// Showdown namespace
//
var Showdown={extensions:{}},forEach=Showdown.forEach=function(a,b){if(typeof a.forEach=="function")a.forEach(b);else{var c,d=a.length;for(c=0;c<d;c++)b(a[c],c,a)}},stdExtName=function(a){return a.replace(/[_-]||\s/g,"").toLowerCase()};Showdown.converter=function(a){var b,c,d,e=0,f=[],g=[];if(typeof module!="undefind"&&typeof exports!="undefined"&&typeof require!="undefind"){var h=require("fs");if(h){var i=h.readdirSync((__dirname||".")+"/extensions").filter(function(a){return~a.indexOf(".js")}).map(function(a){return a.replace(/\.js$/,"")});Showdown.forEach(i,function(a){var b=stdExtName(a);Showdown.extensions[b]=require("./extensions/"+a)})}}this.makeHtml=function(a){return b={},c={},d=[],a=a.replace(/~/g,"~T"),a=a.replace(/\$/g,"~D"),a=a.replace(/\r\n/g,"\n"),a=a.replace(/\r/g,"\n"),a="\n\n"+a+"\n\n",a=M(a),a=a.replace(/^[ \t]+$/mg,""),Showdown.forEach(f,function(b){a=k(b,a)}),a=z(a),a=m(a),a=l(a),a=o(a),a=K(a),a=a.replace(/~D/g,"$$"),a=a.replace(/~T/g,"~"),Showdown.forEach(g,function(b){a=k(b,a)}),a};if(a&&a.extensions){var j=this;Showdown.forEach(a.extensions,function(a){typeof a=="string"&&(a=Showdown.extensions[stdExtName(a)]);if(typeof a!="function")throw"Extension '"+a+"' could not be loaded.  It was either not found or is not a valid extension.";Showdown.forEach(a(j),function(a){a.type?a.type==="language"||a.type==="lang"?f.push(a):(a.type==="output"||a.type==="html")&&g.push(a):g.push(a)})})}var k=function(a,b){if(a.regex){var c=new RegExp(a.regex,"g");return b.replace(c,a.replace)}if(a.filter)return a.filter(b)},l=function(a){return a+="~0",a=a.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|(?=~0))/gm,function(a,d,e,f,g){return d=d.toLowerCase(),b[d]=G(e),f?f+g:(g&&(c[d]=g.replace(/"/g,"&quot;")),"")}),a=a.replace(/~0/,""),a},m=function(a){a=a.replace(/\n/g,"\n\n");var b="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del|style|section|header|footer|nav|article|aside",c="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside";return a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,n),a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside)\b[^\r]*?<\/\2>[ \t]*(?=\n+)\n)/gm,n),a=a.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,n),a=a.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,n),a=a.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,n),a=a.replace(/\n\n/g,"\n"),a},n=function(a,b){var c=b;return c=c.replace(/\n\n/g,"\n"),c=c.replace(/^\n/,""),c=c.replace(/\n+$/g,""),c="\n\n~K"+(d.push(c)-1)+"K\n\n",c},o=function(a){a=v(a);var b=A("<hr />");return a=a.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,b),a=a.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,b),a=a.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,b),a=x(a),a=y(a),a=E(a),a=m(a),a=F(a),a},p=function(a){return a=B(a),a=q(a),a=H(a),a=t(a),a=r(a),a=I(a),a=G(a),a=D(a),a=a.replace(/  +\n/g," <br />\n"),a},q=function(a){var b=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;return a=a.replace(b,function(a){var b=a.replace(/(.)<\/?code>(?=.)/g,"$1`");return b=N(b,"\\`*_"),b}),a},r=function(a){return a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,s),a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,s),a=a.replace(/(\[([^\[\]]+)\])()()()()()/g,s),a},s=function(a,d,e,f,g,h,i,j){j==undefined&&(j="");var k=d,l=e,m=f.toLowerCase(),n=g,o=j;if(n==""){m==""&&(m=l.toLowerCase().replace(/ ?\n/g," ")),n="#"+m;if(b[m]!=undefined)n=b[m],c[m]!=undefined&&(o=c[m]);else{if(!(k.search(/\(\s*\)$/m)>-1))return k;n=""}}n=N(n,"*_");var p='<a href="'+n+'"';return o!=""&&(o=o.replace(/"/g,"&quot;"),o=N(o,"*_"),p+=' title="'+o+'"'),p+=">"+l+"</a>",p},t=function(a){return a=a.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,u),a=a.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,u),a},u=function(a,d,e,f,g,h,i,j){var k=d,l=e,m=f.toLowerCase(),n=g,o=j;o||(o="");if(n==""){m==""&&(m=l.toLowerCase().replace(/ ?\n/g," ")),n="#"+m;if(b[m]==undefined)return k;n=b[m],c[m]!=undefined&&(o=c[m])}l=l.replace(/"/g,"&quot;"),n=N(n,"*_");var p='<img src="'+n+'" alt="'+l+'"';return o=o.replace(/"/g,"&quot;"),o=N(o,"*_"),p+=' title="'+o+'"',p+=" />",p},v=function(a){function b(a){return a.replace(/[^\w]/g,"").toLowerCase()}return a=a.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(a,c){return A('<h1 id="'+b(c)+'">'+p(c)+"</h1>")}),a=a.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(a,c){return A('<h2 id="'+b(c)+'">'+p(c)+"</h2>")}),a=a.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(a,c,d){var e=c.length;return A("<h"+e+' id="'+b(d)+'">'+p(d)+"</h"+e+">")}),a},w,x=function(a){a+="~0";var b=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;return e?a=a.replace(b,function(a,b,c){var d=b,e=c.search(/[*+-]/g)>-1?"ul":"ol";d=d.replace(/\n{2,}/g,"\n\n\n");var f=w(d);return f=f.replace(/\s+$/,""),f="<"+e+">"+f+"</"+e+">\n",f}):(b=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g,a=a.replace(b,function(a,b,c,d){var e=b,f=c,g=d.search(/[*+-]/g)>-1?"ul":"ol",f=f.replace(/\n{2,}/g,"\n\n\n"),h=w(f);return h=e+"<"+g+">\n"+h+"</"+g+">\n",h})),a=a.replace(/~0/,""),a};w=function(a){return e++,a=a.replace(/\n{2,}$/,"\n"),a+="~0",a=a.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,function(a,b,c,d,e){var f=e,g=b,h=c;return g||f.search(/\n{2,}/)>-1?f=o(L(f)):(f=x(L(f)),f=f.replace(/\n$/,""),f=p(f)),"<li>"+f+"</li>\n"}),a=a.replace(/~0/g,""),e--,a};var y=function(a){return a+="~0",a=a.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(a,b,c){var d=b,e=c;return d=C(L(d)),d=M(d),d=d.replace(/^\n+/g,""),d=d.replace(/\n+$/g,""),d="<pre><code>"+d+"\n</code></pre>",A(d)+e}),a=a.replace(/~0/,""),a},z=function(a){return a+="~0",a=a.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(a,b,c){var d=b,e=c;return e=C(e),e=M(e),e=e.replace(/^\n+/g,""),e=e.replace(/\n+$/g,""),e="<pre><code"+(d?' class="'+d+'"':"")+">"+e+"\n</code></pre>",A(e)}),a=a.replace(/~0/,""),a},A=function(a){return a=a.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(d.push(a)-1)+"K\n\n"},B=function(a){return a=a.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(a,b,c,d,e){var f=d;return f=f.replace(/^([ \t]*)/g,""),f=f.replace(/[ \t]*$/g,""),f=C(f),b+"<code>"+f+"</code>"}),a},C=function(a){return a=a.replace(/&/g,"&amp;"),a=a.replace(/</g,"&lt;"),a=a.replace(/>/g,"&gt;"),a=N(a,"*_{}[]\\",!1),a},D=function(a){return a=a.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>"),a=a.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>"),a},E=function(a){return a=a.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(a,b){var c=b;return c=c.replace(/^[ \t]*>[ \t]?/gm,"~0"),c=c.replace(/~0/g,""),c=c.replace(/^[ \t]+$/gm,""),c=o(c),c=c.replace(/(^|\n)/g,"$1  "),c=c.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(a,b){var c=b;return c=c.replace(/^  /mg,"~0"),c=c.replace(/~0/g,""),c}),A("<blockquote>\n"+c+"\n</blockquote>")}),a},F=function(a){a=a.replace(/^\n+/g,""),a=a.replace(/\n+$/g,"");var b=a.split(/\n{2,}/g),c=[],e=b.length;for(var f=0;f<e;f++){var g=b[f];g.search(/~K(\d+)K/g)>=0?c.push(g):g.search(/\S/)>=0&&(g=p(g),g=g.replace(/^([ \t]*)/g,"<p>"),g+="</p>",c.push(g))}e=c.length;for(var f=0;f<e;f++)while(c[f].search(/~K(\d+)K/)>=0){var h=d[RegExp.$1];h=h.replace(/\$/g,"$$$$"),c[f]=c[f].replace(/~K\d+K/,h)}return c.join("\n\n")},G=function(a){return a=a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),a=a.replace(/<(?![a-z\/?\$!])/gi,"&lt;"),a},H=function(a){return a=a.replace(/\\(\\)/g,O),a=a.replace(/\\([`*_{}\[\]()>#+-.!])/g,O),a},I=function(a){return a=a.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,'<a href="$1">$1</a>'),a=a.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,function(a,b){return J(K(b))}),a},J=function(a){var b=[function(a){return"&#"+a.charCodeAt(0)+";"},function(a){return"&#x"+a.charCodeAt(0).toString(16)+";"},function(a){return a}];return a="mailto:"+a,a=a.replace(/./g,function(a){if(a=="@")a=b[Math.floor(Math.random()*2)](a);else if(a!=":"){var c=Math.random();a=c>.9?b[2](a):c>.45?b[1](a):b[0](a)}return a}),a='<a href="'+a+'">'+a+"</a>",a=a.replace(/">.+:/g,'">'),a},K=function(a){return a=a.replace(/~E(\d+)E/g,function(a,b){var c=parseInt(b);return String.fromCharCode(c)}),a},L=function(a){return a=a.replace(/^(\t|[ ]{1,4})/gm,"~0"),a=a.replace(/~0/g,""),a},M=function(a){return a=a.replace(/\t(?=\t)/g,"    "),a=a.replace(/\t/g,"~A~B"),a=a.replace(/~B(.+?)~A/g,function(a,b,c){var d=b,e=4-d.length%4;for(var f=0;f<e;f++)d+=" ";return d}),a=a.replace(/~A/g,"    "),a=a.replace(/~B/g,""),a},N=function(a,b,c){var d="(["+b.replace(/([\[\]\\])/g,"\\$1")+"])";c&&(d="\\\\"+d);var e=new RegExp(d,"g");return a=a.replace(e,O),a},O=function(a,b){var c=b.charCodeAt(0);return"~E"+c+"E"}},typeof module!="undefined"&&(module.exports=Showdown),typeof define=="function"&&define.amd&&define("showdown",function(){return Showdown});/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){
	
	jQuery.hotkeys = {
		version: "0.8",

		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},
	
		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
			".": ">",  "/": "?",  "\\": "|"
		}
	};

	function keyHandler( handleObj ) {
		// Only care when a possible input has been specified
		if ( typeof handleObj.data !== "string" ) {
			return;
		}
		
		var origHandler = handleObj.handler,
			keys = handleObj.data.toLowerCase().split(" ");
	
		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				 event.target.type === "text") ) {
				return;
			}
			
			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt+";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl+";
			}
			
			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta+";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift+";
			}

			if ( special ) {
				possible[ modif + special ] = true;

			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift+" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2.W=b(7){7=2.R({y:o,L:o,K:Y,x:o,A:o,n:o,J:Y},7);g(7.y){g(2.V(7.A)&&2.m(7.n)===\'o\'){7.n=b(M,z,e){7.A(z,e)}}D g(2.m(7.A)===2.m(7.n)===\'o\'){7.n=b(M,z,e){1j.X&&X.1i(\'W 1h 1g 1f h\',M,z,e)}}1e $.1d({m:\'1c\',y:7.y,L:7.L,K:7.K,1b:(2.T.S)?"6":"4",x:b(4){f h=k I(4);g(2.V(7.x))7.x(h)},n:7.n,J:7.J})}};b I(4){g(4)3.U(4)};I.v={m:\'\',p:\'\',d:\'\',c:\'\',j:\'\',U:b(4){g(2.T.S){f H=k 1a("19.18");H.17(4);4=H}g(2(\'9\',4).E==1){3.m=\'C\';f w=k F(4)}D g(2(\'h\',4).E==1){3.m=\'16\';f w=k G(4)}g(w)2.R(3,w)}};b s(){};s.v={d:\'\',c:\'\',j:\'\',l:\'\',r:\'\'};b G(4){3.u(4)};G.v={u:b(4){f 9=2(\'h\',4).a(0);3.p=\'1.0\';3.d=2(9).5(\'d:i\').6();3.c=2(9).5(\'c:i\').t(\'Q\');3.j=2(9).5(\'15:i\').6();3.B=2(9).t(\'4:14\');3.l=2(9).5(\'l:i\').6();3.q=k P();f h=3;2(\'13\',4).O(b(){f 8=k s();8.d=2(3).5(\'d\').a(0).6();8.c=2(3).5(\'c\').a(0).t(\'Q\');8.j=2(3).5(\'12\').a(0).6();8.l=2(3).5(\'l\').a(0).6();8.r=2(3).5(\'r\').a(0).6();h.q.N(8)})}};b F(4){3.u(4)};F.v={u:b(4){g(2(\'C\',4).E==0)3.p=\'1.0\';D 3.p=2(\'C\',4).a(0).t(\'p\');f 9=2(\'9\',4).a(0);3.d=2(9).5(\'d:i\').6();3.c=2(9).5(\'c:i\').6();3.j=2(9).5(\'j:i\').6();3.B=2(9).5(\'B:i\').6();3.l=2(9).5(\'11:i\').6();3.q=k P();f h=3;2(\'8\',4).O(b(){f 8=k s();8.d=2(3).5(\'d\').a(0).6();8.c=2(3).5(\'c\').a(0).6();8.j=2(3).5(\'j\').a(0).6();8.l=2(3).5(\'10\').a(0).6();8.r=2(3).5(\'Z\').a(0).6();h.q.N(8)})}};',62,82,'||jQuery|this|xml|find|text|options|item|channel|eq|function|link|title||var|if|feed|first|description|new|updated|type|error|null|version|items|id|JFeedItem|attr|_parse|prototype|feedClass|success|url|msg|failure|language|rss|else|length|JRss|JAtom|xmlDoc|JFeed|global|cache|data|xhr|push|each|Array|href|extend|msie|browser|parse|isFunction|getFeed|console|true|guid|pubDate|lastBuildDate|content|entry|lang|subtitle|atom|loadXML|XMLDOM|Microsoft|ActiveXObject|dataType|GET|ajax|return|load|to|failed|log|window'.split('|')))

// from https://github.com/azer/relative-date/blob/master/lib/relative-date.js
var relativeDate = (function(undefined){

  var SECOND = 1000,
      MINUTE = 60 * SECOND,
      HOUR = 60 * MINUTE,
      DAY = 24 * HOUR,
      WEEK = 7 * DAY,
      YEAR = DAY * 365,
      MONTH = YEAR / 12;

  var formats = [
    [ 0.7 * MINUTE, 'just now' ],
    [ 1.5 * MINUTE, 'a minute ago' ],
    [ 60 * MINUTE, 'minutes ago', MINUTE ],
    [ 1.5 * HOUR, 'an hour ago' ],
    [ DAY, 'hours ago', HOUR ],
    [ 2 * DAY, 'yesterday' ],
    [ 7 * DAY, 'days ago', DAY ],
    [ 1.5 * WEEK, 'a week ago'],
    [ MONTH, 'weeks ago', WEEK ],
    [ 1.5 * MONTH, 'a month ago' ],
    [ YEAR, 'months ago', MONTH ],
    [ 1.5 * YEAR, 'a year ago' ],
    [ Number.MAX_VALUE, 'years ago', YEAR ]
  ];

  function relativeDate(input,reference){
    !reference && ( reference = (new Date).getTime() );
    reference instanceof Date && ( reference = reference.getTime() );
    input instanceof Date && ( input = input.getTime() );

    var delta = reference - input,
        format, i, len;

    for(i = -1, len=formats.length; ++i < len; ){
      format = formats[i];
      if(delta < format[0]){
        return format[2] == undefined ? format[1] : Math.round(delta/format[2]) + ' ' + format[1];
      }
    };
  }

  return relativeDate;

})()

if(typeof module != 'undefined' && module.exports){
  module.exports = relativeDate
}

// Copyright Callan Bryant 2011-2012 <callan.bryant@gmail.com> http://callanbryant.co.uk
// All rights reserved.
function engine(options) {
	var md = new Showdown.converter()

	// defaults
	if (!options.type && options.src)
		if (options.src.match('\.md$') )
			options.type = 'markdown'
		else if (options.src.match('\.html$') )
			options.type = 'html'
		else if (options.src.match('rss|atom$') )
			options.type = 'rss'
		else if (options.src.match(/manifest\.json$/) )
			options.type = 'blog'

	if (!options.src)
		return console.log('src required', options)

	if (!options.target)
		return console.log('target DOM element required', options)
	else
		// ensure jQuery
		options.target = $(options.target)

	this.target = options.target

	var roster = []

	// lock to render only one at a time during infinite scroll
	var busy  = false
	var ready = false

	// PARSERS, GIVEN A URL, MUST RETURN AN ARRAY OF OBJECTS TO THE GIVEN CALLBACK:
	//
	//   {
	//      title  : optional,
	//	url    : optional,
	//      html   : string or false on error,
	//      date   : date published. Optional,
	//      author : name of publisher. Optional
	//   }
	// Single articles will return a 1-item array. blogs and feeds, multi.
	// This is known as a roster
	// Problem? call back with (false,error)
	// given src, relative dir
	// OR CALLBACK RETURNING ITEM FOR DEFERRED RENDERING
	var parsers = {}

	// use the google RSS->JSONP feed API to get an RSS feed cross-domain
	parsers.rss = parsers.atom = function(src,callback) {
		$.ajax({
			url      : 'https://ajax.googleapis.com/ajax/services/feed/load',
			data     : { v:'1.0', q: src , num: -1},
			type     : 'GET',
			dataType : 'jsonp',
			error    : function(xqHXR,stat,err) { callback(stat) },
			success  : function(res) {
				if (res.responseDetails)
					return console.log(res.responseDetails)

				var entries = res.responseData.feed.entries
				var roster = []
				for (var i in entries)
					roster[i] = {
						title  : entries[i].title,
						url    : entries[i].url,
						html   : entries[i].content,
						date   : entries[i].publishedDate,
						author : entries[i].author,
						type   : 'blog'
					}

				callback(roster)
			}
		})
	}

	// JSON manifest of markdown blog articles: array of ojects detailing
	// src (rel. to manifest), title (optional), author (optional), date (optional)
	parsers.blog = function(src,callback) {
		$.ajax({
			url: src,
			success : function(blog) {
				var dir = src.replace(/[^\/]*$/,'')

				var roster = []

				for (var i in blog) {
					// paths relative to blog
					blog[i].src = dir + blog[i].src

					// set a callback for each roster item pre-programmed to return that particular item using a
					// closure to fix reference problems http://stackoverflow.com/questions/2900839/how-to-structure-javascript-callback-so-that-function-scope-is-maintained-proper
					roster[i] = (function(src){
						return function(callback) {
							parsers.markdown(src,function(roster) {
								roster[0].type = 'blog'

								// other defaults
								// default to filename if title is not given
								if (!roster[0].title)
									roster[0].title = src.match(/([^\/]+)\.[^.]+$/)[1]

								callback(roster[0])
							})
						}
					})(blog[i].src)
				}

				callback(roster)
			},
			error    : function(xqHXR,stat,err) { callback(stat) },
			dataType : 'json'
		})

	}

	parsers.raw = parsers.html = function(src,callback) {
		$.ajax({
			url      : src,
			dataType : 'html',
			error    : function(xqHXR,stat,err) { callback(stat) },
			success  : function(res) {
				callback([{ html: res }])
			}
		})
	}

	parsers.markdown = function(src,callback) {
		parsers.raw(src,function(roster){
			// convert markdown to HTML
			roster[0].html = md.makeHtml(roster[0].html)

			// TODO convert relative links to that of URL  (via this.dir is multi-instantiation is used)

			callback(roster)
		})
	}

	// renderer. Given an item from a renderer and a jQuery DOM object to append to.
	// When engine is instantited (DOM must be ready) infinite scrolling is handled.
	// expects one item from the array. Can be object or callback defering object.
	var render = this.render = function() {
		busy = true
		var section = $('<section />').appendTo(options.target)

		var load = roster.shift()

		// convert item into callback
		if (typeof load == 'object') {
			// IMMEDIATE RENDERING
			// load is actually an item
			var item = load
			var load = function(callback){
				callback(item)
			}
		} else
			// DEFERRED RENDERING
			// section onto targer
			// apply loading gif which will be replaced with this item
			section.html('<div class="throbber"></div>')


		// load the item
		load(function(item) {
			section.html(item.html).addClass(item.type)
			var h1 = $('<h1 />').prependTo(section)
				.text(item.title)

			if (item.title)
				section.append('<hr />')

			if (item.date)
				$('<time />').attr('datetime', item.date)
					.text( relativeDate( new Date(item.date) ) )
					.appendTo(h1)

			if (item.author)
				$('<span />').addClass('note')
					.text(' by ').append(item.author)
					.appendTo(h1)

			// syntax highlighting
			$('pre code',section).each(function(i, e) {hljs.highlightBlock(e)})

			busy = false
		})
	}


	this.evaluate = function(items) {
		// test if last post has finished loading and initial parse has run
		if (busy || !ready) return

		// must be visible (eg, another tab might be selected)
		if (!$('section:visible',options.target).length) return

		// no more to render? disable infinite scrolling.
		if (roster.length == 0)
			return //$(window).unbind('scroll',this)

		// test if last article is in view
		if ($(window).scrollTop() > $('section',options.target).last().offset().top - $(window).height() ) {
			render()
		}
	}


	// will continue to render more items if appropriate
	// a previous article must be visible and loaded first
	// initialise infinite scroll event handlers
	$(window).scroll(this.evaluate)

	// every minute, update relative dates
	setInterval( function() {
		$('time[datetime]',options.target).each(function(){
			var absdate = new Date( $(this).attr('datetime') )
			$(this).text( relativeDate(absdate) )
		})
	} ,30000)


	parsers[options.type](options.src,function(items){
		roster = items

		// render one item
		render()
		ready = true
	})


}
// Copyright Callan Bryant 2011-2012 <callan.bryant@gmail.com> http://callanbryant.co.uk
// All rights reserved.

$(function(){
	generateNav()
	animations() // also preloads when appropriate
	hotkeys()
})

// create elements representing pages
// with attached events
function generateNav()
{
	$('nav').empty()
	$('article[data-name]').each(function(index,art){
		// jquery-ify
		art = $(art)

		// safe URL hash for link
		var hash = '#'+art.data('name').replace(/[^0-9a-z]+/gi,'-')

		var link = $("<a />").addClass('service')
		link.text(art.data('name'))
		link.appendTo('nav')
		link.click(showThisArticle)

		link.one('mouseenter',function() {
			initArticle(art)
		})

		link.data('article',art)

		// attach link
		link.attr('href',hash)

		// title (to be made nice with bootstrap tooltips or tipsy)
		link.attr('title', art.data('hint') )

		if(document.location.hash == hash)
			link.each(showThisArticle)

		// no hash or empty hash
		if (art.hasClass('default') && document.location.hash.length <=1)
			link.each(showThisArticle)
	})
}

// show article, given nav link in 'this' context
function showThisArticle()
{
	var art = $(this).data('article')

	// hide all other articles
	$('article').hide()
	// show this one
	art.show().text()

	// clear active on all other service
	$('nav .service').removeClass('active')
	// select this link
	$(this).addClass('active')

	// update hash location (when active, not clicked)
	// also only give the default article a hash if explicitly active
	if( !art.hasClass('default') || document.location.hash)
		document.location.hash = $(this).attr('href')

	$('.articles header').html(  art.data('hint') )

	// need to init? (automatic now)
	//if ( !$(this).data('article').data('ready') )
		initArticle(art)
}

function preloadArticles(){
	$('article[data-preload]').each(function(){
		initArticle($(this))
	})
}

// initialise the article, given the mathing jQuery object
function initArticle(art) {
	// only want to call this once...
	if (art.data('engine')) return false

	// no need to process inline HTML
	if (! art.data('src')) return false

	art.data('engine',new engine({
		src    : art.data('src'),
		target : art,
		type   : art.data('type')
	}))
}

function animations() {
	$('#backdrop > img').hide().bind("load",function(){
		$(this).fadeIn(3500)
		// now is a good time to preload any articles
		preloadArticles()
	})

	$('article .logos img').css('opacity',0).load(function(){
		$(this).fadeTo('fast',0.7)
	})

	$('#contact').hide()

	var hideQuote = function(){
		$('#logo .quote').stop().fadeOut()
		$('#logo h1').stop().animate({'margin-top':'50px'})
	}

	setTimeout(function(){
		hideQuote()
		$('#logo').bind('mouseleave',hideQuote)
	},4000)

	$('#logo').bind('mouseenter',function(){
		$('#logo .quote').stop().fadeIn()
		$('#logo h1').stop().animate({'margin-top':'26px'})
	})



	var contactTimeout = setTimeout(function(){
		$('#contact').hide().fadeIn()
	},6000)

	$(window).one('scroll',function(){
		clearTimeout(contactTimeout)
		$('#contact').fadeIn()
	})


	// IE9 hack
	// the load event does not always fire due to caching,
	// so trigger it manually...
	if($.browser.msie && parseInt($.browser.version) >= 9 )
		setTimeout(function(){
			$('img').trigger('load')
		},3000)


}

// map hotkeys
function hotkeys(){
	// left/right select service
	$(document).bind('keydown',"right",function(){
		// check to see if a service has been active
		if (!$('.service').hasClass('active'))
			var next = $('.service').first()
		else
			var next = $('.active').next()

		next.each(showThisArticle)
	})
	$(document).bind('keydown',"left",function(){
	// check to see if a service has been active
		if (!$('.service').hasClass('active'))
			var next = $('.service').first()
		else
			var next = $('.active').prev()

		next.each(showThisArticle)
	})

	// enter to go to the URL of the active service
	$(document).bind('keyup','return',function(){
		$('nav a.active').each(function(){
			// restore postion
			$('.active').css('top',0)
			// do something else using active nav link or attachedarticle
		})
	}).bind('keydown','return',function(){
		$('.active').css('position','relative').css('top','2px')
	})
}

// Copyright Callan Bryant 2011-2012 <callan.bryant@gmail.com> http://callanbryant.co.uk
// All rights reserved.
var hljs=new function(){function m(p){return p.replace(/&/gm,"&amp;").replace(/</gm,"&lt;")}function c(r,q,p){return RegExp(q,"m"+(r.cI?"i":"")+(p?"g":""))}function j(r){for(var p=0;p<r.childNodes.length;p++){var q=r.childNodes[p];if(q.nodeName=="CODE"){return q}if(!(q.nodeType==3&&q.nodeValue.match(/\s+/))){break}}}function g(t,s){var r="";for(var q=0;q<t.childNodes.length;q++){if(t.childNodes[q].nodeType==3){var p=t.childNodes[q].nodeValue;if(s){p=p.replace(/\n/g,"")}r+=p}else{if(t.childNodes[q].nodeName=="BR"){r+="\n"}else{r+=g(t.childNodes[q])}}}if(/MSIE [678]/.test(navigator.userAgent)){r=r.replace(/\r/g,"\n")}return r}function a(s){var q=s.className.split(/\s+/);q=q.concat(s.parentNode.className.split(/\s+/));for(var p=0;p<q.length;p++){var r=q[p].replace(/^language-/,"");if(d[r]||r=="no-highlight"){return r}}}function b(p){var q=[];(function(s,t){for(var r=0;r<s.childNodes.length;r++){if(s.childNodes[r].nodeType==3){t+=s.childNodes[r].nodeValue.length}else{if(s.childNodes[r].nodeName=="BR"){t+=1}else{if(s.childNodes[r].nodeType==1){q.push({event:"start",offset:t,node:s.childNodes[r]});t=arguments.callee(s.childNodes[r],t);q.push({event:"stop",offset:t,node:s.childNodes[r]})}}}}return t})(p,0);return q}function l(y,z,x){var r=0;var w="";var t=[];function u(){if(y.length&&z.length){if(y[0].offset!=z[0].offset){return(y[0].offset<z[0].offset)?y:z}else{return z[0].event=="start"?y:z}}else{return y.length?y:z}}function s(C){var D="<"+C.nodeName.toLowerCase();for(var A=0;A<C.attributes.length;A++){var B=C.attributes[A];D+=" "+B.nodeName.toLowerCase();if(B.value!==undefined&&B.value!==false&&B.value!==null){D+='="'+m(B.value)+'"'}}return D+">"}while(y.length||z.length){var v=u().splice(0,1)[0];w+=m(x.substr(r,v.offset-r));r=v.offset;if(v.event=="start"){w+=s(v.node);t.push(v.node)}else{if(v.event=="stop"){var p,q=t.length;do{q--;p=t[q];w+=("</"+p.nodeName.toLowerCase()+">")}while(p!=v.node);t.splice(q,1);while(q<t.length){w+=s(t[q]);q++}}}}return w+m(x.substr(r))}function i(){function p(w,u,x){if(w.compiled){return}var t;if(!x){w.bR=c(u,w.b?w.b:"\\B|\\b");if(!w.e&&!w.eW){w.e="\\B|\\b"}if(w.e){w.eR=c(u,w.e)}}if(w.i){w.iR=c(u,w.i)}if(w.r===undefined){w.r=1}if(w.k){w.lR=c(u,w.l||hljs.IR,true);for(var v in w.k){if(!w.k.hasOwnProperty(v)){continue}if(w.k[v] instanceof Object){t=w.k[v]}else{t=w.k;v="keyword"}for(var s in t){if(!t.hasOwnProperty(s)){continue}w.k[s]=[v,t[s]]}}}if(!w.c){w.c=[]}w.compiled=true;for(var r=0;r<w.c.length;r++){if(w.c[r]=="self"){w.c[r]=w}p(w.c[r],u,false)}if(w.starts){p(w.starts,u,false)}}for(var q in d){if(!d.hasOwnProperty(q)){continue}p(d[q].dM,d[q],true)}}function e(J,D){if(!i.called){i();i.called=true}function z(r,M){for(var L=0;L<M.c.length;L++){if(M.c[L].bR.test(r)){return M.c[L]}}}function w(L,r){if(C[L].e&&C[L].eR.test(r)){return 1}if(C[L].eW){var M=w(L-1,r);return M?M+1:0}return 0}function x(r,L){return L.i&&L.iR.test(r)}function A(O,N){var M=[];for(var L=0;L<O.c.length;L++){M.push(O.c[L].b)}var r=C.length-1;do{if(C[r].e){M.push(C[r].e)}r--}while(C[r+1].eW);if(O.i){M.push(O.i)}return c(N,"("+M.join("|")+")",true)}function s(M,L){var N=C[C.length-1];if(!N.t){N.t=A(N,H)}N.t.lastIndex=L;var r=N.t.exec(M);if(r){return[M.substr(L,r.index-L),r[0],false]}else{return[M.substr(L),"",true]}}function p(N,r){var L=H.cI?r[0].toLowerCase():r[0];var M=N.k[L];if(M&&M instanceof Array){return M}return false}function F(M,O){M=m(M);if(!O.k){return M}var N="";var P=0;O.lR.lastIndex=0;var L=O.lR.exec(M);while(L){N+=M.substr(P,L.index-P);var r=p(O,L);if(r){t+=r[1];N+='<span class="'+r[0]+'">'+L[0]+"</span>"}else{N+=L[0]}P=O.lR.lastIndex;L=O.lR.exec(M)}return N+M.substr(P,M.length-P)}function K(r,M){if(M.sL&&d[M.sL]){var L=e(M.sL,r);t+=L.keyword_count;return L.value}else{return F(r,M)}}function I(M,r){var L=M.cN?'<span class="'+M.cN+'">':"";if(M.rB){q+=L;M.buffer=""}else{if(M.eB){q+=m(r)+L;M.buffer=""}else{q+=L;M.buffer=r}}C.push(M);B+=M.r}function E(O,L,Q){var R=C[C.length-1];if(Q){q+=K(R.buffer+O,R);return false}var M=z(L,R);if(M){q+=K(R.buffer+O,R);I(M,L);return M.rB}var r=w(C.length-1,L);if(r){var N=R.cN?"</span>":"";if(R.rE){q+=K(R.buffer+O,R)+N}else{if(R.eE){q+=K(R.buffer+O,R)+N+m(L)}else{q+=K(R.buffer+O+L,R)+N}}while(r>1){N=C[C.length-2].cN?"</span>":"";q+=N;r--;C.length--}var P=C[C.length-1];C.length--;C[C.length-1].buffer="";if(P.starts){I(P.starts,"")}return R.rE}if(x(L,R)){throw"Illegal"}}var H=d[J];var C=[H.dM];var B=0;var t=0;var q="";try{var y,v=0;H.dM.buffer="";do{y=s(D,v);var u=E(y[0],y[1],y[2]);v+=y[0].length;if(!u){v+=y[1].length}}while(!y[2]);if(C.length>1){throw"Illegal"}return{r:B,keyword_count:t,value:q}}catch(G){if(G=="Illegal"){return{r:0,keyword_count:0,value:m(D)}}else{throw G}}}function f(t){var r={keyword_count:0,r:0,value:m(t)};var q=r;for(var p in d){if(!d.hasOwnProperty(p)){continue}var s=e(p,t);s.language=p;if(s.keyword_count+s.r>q.keyword_count+q.r){q=s}if(s.keyword_count+s.r>r.keyword_count+r.r){q=r;r=s}}if(q.language){r.second_best=q}return r}function h(r,q,p){if(q){r=r.replace(/^((<[^>]+>|\t)+)/gm,function(t,w,v,u){return w.replace(/\t/g,q)})}if(p){r=r.replace(/\n/g,"<br>")}return r}function o(u,x,q){var y=g(u,q);var s=a(u);var w,r;if(s=="no-highlight"){return}if(s){w=e(s,y)}else{w=f(y);s=w.language}var p=b(u);if(p.length){r=document.createElement("pre");r.innerHTML=w.value;w.value=l(p,b(r),y)}w.value=h(w.value,x,q);var t=u.className;if(!t.match("(\\s|^)(language-)?"+s+"(\\s|$)")){t=t?(t+" "+s):s}if(/MSIE [678]/.test(navigator.userAgent)&&u.tagName=="CODE"&&u.parentNode.tagName=="PRE"){r=u.parentNode;var v=document.createElement("div");v.innerHTML="<pre><code>"+w.value+"</code></pre>";u=v.firstChild.firstChild;v.firstChild.cN=r.cN;r.parentNode.replaceChild(v.firstChild,r)}else{u.innerHTML=w.value}u.className=t;u.result={language:s,kw:w.keyword_count,re:w.r};if(w.second_best){u.second_best={language:w.second_best.language,kw:w.second_best.keyword_count,re:w.second_best.r}}}function k(){if(k.called){return}k.called=true;var r=document.getElementsByTagName("pre");for(var p=0;p<r.length;p++){var q=j(r[p]);if(q){o(q,hljs.tabReplace)}}}function n(){if(window.addEventListener){window.addEventListener("DOMContentLoaded",k,false);window.addEventListener("load",k,false)}else{if(window.attachEvent){window.attachEvent("onload",k)}else{window.onload=k}}}var d={};this.LANGUAGES=d;this.highlight=e;this.highlightAuto=f;this.fixMarkup=h;this.highlightBlock=o;this.initHighlighting=k;this.initHighlightingOnLoad=n;this.IR="[a-zA-Z][a-zA-Z0-9_]*";this.UIR="[a-zA-Z_][a-zA-Z0-9_]*";this.NR="\\b\\d+(\\.\\d+)?";this.CNR="\\b(0[xX][a-fA-F0-9]+|(\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";this.BINARY_NUMBER_RE="\\b(0b[01]+)";this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";this.BE={b:"\\\\.",r:0};this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE],r:0};this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE],r:0};this.CLCM={cN:"comment",b:"//",e:"$"};this.CBLCLM={cN:"comment",b:"/\\*",e:"\\*/"};this.HCM={cN:"comment",b:"#",e:"$"};this.NM={cN:"number",b:this.NR,r:0};this.CNM={cN:"number",b:this.CNR,r:0};this.BINARY_NUMBER_MODE={cN:"number",b:this.BINARY_NUMBER_RE,r:0};this.inherit=function(p,s){var r={};for(var q in p){r[q]=p[q]}if(s){for(var q in s){r[q]=s[q]}}return r}}();hljs.LANGUAGES.bash=function(){var d={"true":1,"false":1};var c={cN:"variable",b:"\\$([a-zA-Z0-9_]+)\\b"};var a={cN:"variable",b:"\\$\\{(([^}])|(\\\\}))+\\}",c:[hljs.CNM]};var f={cN:"string",b:'"',e:'"',i:"\\n",c:[hljs.BE,c,a],r:0};var b={cN:"string",b:"'",e:"'",r:0};var e={cN:"test_condition",b:"",e:"",c:[f,b,c,a,hljs.CNM],k:{literal:d},r:0};return{dM:{k:{keyword:{"if":1,then:1,"else":1,fi:1,"for":1,"break":1,"continue":1,"while":1,"in":1,"do":1,done:1,echo:1,exit:1,"return":1,set:1,declare:1},literal:d},c:[{cN:"shebang",b:"(#!\\/bin\\/bash)|(#!\\/bin\\/sh)",r:10},c,a,hljs.HCM,hljs.CNM,f,b,hljs.inherit(e,{b:"\\[ ",e:" \\]",r:0}),hljs.inherit(e,{b:"\\[\\[ ",e:" \\]\\]"})]}}}();hljs.LANGUAGES.cs={dM:{k:{"abstract":1,as:1,base:1,bool:1,"break":1,"byte":1,"case":1,"catch":1,"char":1,checked:1,"class":1,"const":1,"continue":1,decimal:1,"default":1,delegate:1,"do":1,"double":1,"else":1,"enum":1,event:1,explicit:1,extern:1,"false":1,"finally":1,fixed:1,"float":1,"for":1,foreach:1,"goto":1,"if":1,implicit:1,"in":1,"int":1,"interface":1,internal:1,is:1,lock:1,"long":1,namespace:1,"new":1,"null":1,object:1,operator:1,out:1,override:1,params:1,"private":1,"protected":1,"public":1,readonly:1,ref:1,"return":1,sbyte:1,sealed:1,"short":1,sizeof:1,stackalloc:1,"static":1,string:1,struct:1,"switch":1,"this":1,"throw":1,"true":1,"try":1,"typeof":1,uint:1,ulong:1,unchecked:1,unsafe:1,ushort:1,using:1,virtual:1,"volatile":1,"void":1,"while":1,ascending:1,descending:1,from:1,get:1,group:1,into:1,join:1,let:1,orderby:1,partial:1,select:1,set:1,value:1,"var":1,where:1,yield:1},c:[{cN:"comment",b:"///",e:"$",rB:true,c:[{cN:"xmlDocTag",b:"///|<!--|-->"},{cN:"xmlDocTag",b:"</?",e:">"}]},hljs.CLCM,hljs.CBLCLM,{cN:"preprocessor",b:"#",e:"$",k:{"if":1,"else":1,elif:1,endif:1,define:1,undef:1,warning:1,error:1,line:1,region:1,endregion:1,pragma:1,checksum:1}},{cN:"string",b:'@"',e:'"',c:[{b:'""'}]},hljs.ASM,hljs.QSM,hljs.CNM]}};hljs.LANGUAGES.ruby=function(){var c="[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?";var i="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?";var a={keyword:{and:1,"false":1,then:1,defined:1,module:1,"in":1,"return":1,redo:1,"if":1,BEGIN:1,retry:1,end:1,"for":1,"true":1,self:1,when:1,next:1,until:1,"do":1,begin:1,unless:1,END:1,rescue:1,nil:1,"else":1,"break":1,undef:1,not:1,"super":1,"class":1,"case":1,require:1,yield:1,alias:1,"while":1,ensure:1,elsif:1,or:1,def:1},keymethods:{__id__:1,__send__:1,abort:1,abs:1,"all?":1,allocate:1,ancestors:1,"any?":1,arity:1,assoc:1,at:1,at_exit:1,autoload:1,"autoload?":1,"between?":1,binding:1,binmode:1,"block_given?":1,call:1,callcc:1,caller:1,capitalize:1,"capitalize!":1,casecmp:1,"catch":1,ceil:1,center:1,chomp:1,"chomp!":1,chop:1,"chop!":1,chr:1,"class":1,class_eval:1,"class_variable_defined?":1,class_variables:1,clear:1,clone:1,close:1,close_read:1,close_write:1,"closed?":1,coerce:1,collect:1,"collect!":1,compact:1,"compact!":1,concat:1,"const_defined?":1,const_get:1,const_missing:1,const_set:1,constants:1,count:1,crypt:1,"default":1,default_proc:1,"delete":1,"delete!":1,delete_at:1,delete_if:1,detect:1,display:1,div:1,divmod:1,downcase:1,"downcase!":1,downto:1,dump:1,dup:1,each:1,each_byte:1,each_index:1,each_key:1,each_line:1,each_pair:1,each_value:1,each_with_index:1,"empty?":1,entries:1,eof:1,"eof?":1,"eql?":1,"equal?":1,"eval":1,exec:1,exit:1,"exit!":1,extend:1,fail:1,fcntl:1,fetch:1,fileno:1,fill:1,find:1,find_all:1,first:1,flatten:1,"flatten!":1,floor:1,flush:1,for_fd:1,foreach:1,fork:1,format:1,freeze:1,"frozen?":1,fsync:1,getc:1,gets:1,global_variables:1,grep:1,gsub:1,"gsub!":1,"has_key?":1,"has_value?":1,hash:1,hex:1,id:1,include:1,"include?":1,included_modules:1,index:1,indexes:1,indices:1,induced_from:1,inject:1,insert:1,inspect:1,instance_eval:1,instance_method:1,instance_methods:1,"instance_of?":1,"instance_variable_defined?":1,instance_variable_get:1,instance_variable_set:1,instance_variables:1,"integer?":1,intern:1,invert:1,ioctl:1,"is_a?":1,isatty:1,"iterator?":1,join:1,"key?":1,keys:1,"kind_of?":1,lambda:1,last:1,length:1,lineno:1,ljust:1,load:1,local_variables:1,loop:1,lstrip:1,"lstrip!":1,map:1,"map!":1,match:1,max:1,"member?":1,merge:1,"merge!":1,method:1,"method_defined?":1,method_missing:1,methods:1,min:1,module_eval:1,modulo:1,name:1,nesting:1,"new":1,next:1,"next!":1,"nil?":1,nitems:1,"nonzero?":1,object_id:1,oct:1,open:1,pack:1,partition:1,pid:1,pipe:1,pop:1,popen:1,pos:1,prec:1,prec_f:1,prec_i:1,print:1,printf:1,private_class_method:1,private_instance_methods:1,"private_method_defined?":1,private_methods:1,proc:1,protected_instance_methods:1,"protected_method_defined?":1,protected_methods:1,public_class_method:1,public_instance_methods:1,"public_method_defined?":1,public_methods:1,push:1,putc:1,puts:1,quo:1,raise:1,rand:1,rassoc:1,read:1,read_nonblock:1,readchar:1,readline:1,readlines:1,readpartial:1,rehash:1,reject:1,"reject!":1,remainder:1,reopen:1,replace:1,require:1,"respond_to?":1,reverse:1,"reverse!":1,reverse_each:1,rewind:1,rindex:1,rjust:1,round:1,rstrip:1,"rstrip!":1,scan:1,seek:1,select:1,send:1,set_trace_func:1,shift:1,singleton_method_added:1,singleton_methods:1,size:1,sleep:1,slice:1,"slice!":1,sort:1,"sort!":1,sort_by:1,split:1,sprintf:1,squeeze:1,"squeeze!":1,srand:1,stat:1,step:1,store:1,strip:1,"strip!":1,sub:1,"sub!":1,succ:1,"succ!":1,sum:1,superclass:1,swapcase:1,"swapcase!":1,sync:1,syscall:1,sysopen:1,sysread:1,sysseek:1,system:1,syswrite:1,taint:1,"tainted?":1,tell:1,test:1,"throw":1,times:1,to_a:1,to_ary:1,to_f:1,to_hash:1,to_i:1,to_int:1,to_io:1,to_proc:1,to_s:1,to_str:1,to_sym:1,tr:1,"tr!":1,tr_s:1,"tr_s!":1,trace_var:1,transpose:1,trap:1,truncate:1,"tty?":1,type:1,ungetc:1,uniq:1,"uniq!":1,unpack:1,unshift:1,untaint:1,untrace_var:1,upcase:1,"upcase!":1,update:1,upto:1,"value?":1,values:1,values_at:1,warn:1,write:1,write_nonblock:1,"zero?":1,zip:1}};var d={cN:"yardoctag",b:"@[A-Za-z]+"};var k=[{cN:"comment",b:"#",e:"$",c:[d]},{cN:"comment",b:"^\\=begin",e:"^\\=end",c:[d],r:10},{cN:"comment",b:"^__END__",e:"\\n$"}];var e={cN:"subst",b:"#\\{",e:"}",l:c,k:a};var g=[hljs.BE,e];var f=[{cN:"string",b:"'",e:"'",c:g,r:0},{cN:"string",b:'"',e:'"',c:g,r:0},{cN:"string",b:"%[qw]?\\(",e:"\\)",c:g,r:10},{cN:"string",b:"%[qw]?\\[",e:"\\]",c:g,r:10},{cN:"string",b:"%[qw]?{",e:"}",c:g,r:10},{cN:"string",b:"%[qw]?<",e:">",c:g,r:10},{cN:"string",b:"%[qw]?/",e:"/",c:g,r:10},{cN:"string",b:"%[qw]?%",e:"%",c:g,r:10},{cN:"string",b:"%[qw]?-",e:"-",c:g,r:10},{cN:"string",b:"%[qw]?\\|",e:"\\|",c:g,r:10}];var h={cN:"function",b:"\\bdef\\s+",e:" |$|;",l:c,k:a,c:[{cN:"title",b:i,l:c,k:a},{cN:"params",b:"\\(",e:"\\)",l:c,k:a}].concat(k)};var j={cN:"identifier",b:c,l:c,k:a,r:0};var b=k.concat(f.concat([{cN:"class",b:"\\b(class|module)\\b",e:"$|;",k:{"class":1,module:1},c:[{cN:"title",b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?",r:0},{cN:"inheritance",b:"<\\s*",c:[{cN:"parent",b:"("+hljs.IR+"::)?"+hljs.IR}]}].concat(k)},h,{cN:"constant",b:"(::)?([A-Z]\\w*(::)?)+",r:0},{cN:"symbol",b:":",c:f.concat([j]),r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{cN:"number",b:"\\?\\w"},{cN:"variable",b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},j,{b:"("+hljs.RSR+")\\s*",c:k.concat([{cN:"regexp",b:"/",e:"/[a-z]*",i:"\\n",c:[hljs.BE]}]),r:0}]));e.c=b;h.c[1].c=b;return{dM:{l:c,k:a,c:b}}}();hljs.LANGUAGES.diff={cI:true,dM:{c:[{cN:"chunk",b:"^\\@\\@ +\\-\\d+,\\d+ +\\+\\d+,\\d+ +\\@\\@$",r:10},{cN:"chunk",b:"^\\*\\*\\* +\\d+,\\d+ +\\*\\*\\*\\*$",r:10},{cN:"chunk",b:"^\\-\\-\\- +\\d+,\\d+ +\\-\\-\\-\\-$",r:10},{cN:"header",b:"Index: ",e:"$"},{cN:"header",b:"=====",e:"=====$"},{cN:"header",b:"^\\-\\-\\-",e:"$"},{cN:"header",b:"^\\*{3} ",e:"$"},{cN:"header",b:"^\\+\\+\\+",e:"$"},{cN:"header",b:"\\*{5}",e:"\\*{5}$"},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"change",b:"^\\!",e:"$"}]}};hljs.LANGUAGES.javascript={dM:{k:{keyword:{"in":1,"if":1,"for":1,"while":1,"finally":1,"var":1,"new":1,"function":1,"do":1,"return":1,"void":1,"else":1,"break":1,"catch":1,"instanceof":1,"with":1,"throw":1,"case":1,"default":1,"try":1,"this":1,"switch":1,"continue":1,"typeof":1,"delete":1},literal:{"true":1,"false":1,"null":1}},c:[hljs.ASM,hljs.QSM,hljs.CLCM,hljs.CBLCLM,hljs.CNM,{b:"("+hljs.RSR+"|case|return|throw)\\s*",k:{"return":1,"throw":1,"case":1},c:[hljs.CLCM,hljs.CBLCLM,{cN:"regexp",b:"/",e:"/[gim]*",c:[{b:"\\\\/"}]}],r:0},{cN:"function",b:"\\bfunction\\b",e:"{",k:{"function":1},c:[{cN:"title",b:"[A-Za-z$_][0-9A-Za-z$_]*"},{cN:"params",b:"\\(",e:"\\)",c:[hljs.ASM,hljs.QSM,hljs.CLCM,hljs.CBLCLM]}]}]}};hljs.LANGUAGES.css=function(){var a={cN:"function",b:hljs.IR+"\\(",e:"\\)",c:[{eW:true,eE:true,c:[hljs.NM,hljs.ASM,hljs.QSM]}]};return{cI:true,dM:{i:"[=/|']",c:[hljs.CBLCLM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:{"font-face":1,page:1}},{cN:"at_rule",b:"@",e:"[{;]",eE:true,k:{"import":1,page:1,media:1,charset:1},c:[a,hljs.ASM,hljs.QSM,hljs.NM]},{cN:"tag",b:hljs.IR,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[hljs.CBLCLM,{cN:"rule",b:"[^\\s]",rB:true,e:";",eW:true,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:true,i:"[^\\s]",starts:{cN:"value",eW:true,eE:true,c:[a,hljs.NM,hljs.QSM,hljs.ASM,hljs.CBLCLM,{cN:"hexcolor",b:"\\#[0-9A-F]+"},{cN:"important",b:"!important"}]}}]}]}]}}}();hljs.LANGUAGES.xml=function(){var b="[A-Za-z0-9\\._:-]+";var a={eW:true,c:[{cN:"attribute",b:b,r:0},{b:'="',rB:true,e:'"',c:[{cN:"value",b:'"',eW:true}]},{b:"='",rB:true,e:"'",c:[{cN:"value",b:"'",eW:true}]},{b:"=",c:[{cN:"value",b:"[^\\s/>]+"}]}]};return{cI:true,dM:{c:[{cN:"pi",b:"<\\?",e:"\\?>",r:10},{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:{style:1}},c:[a],starts:{cN:"css",e:"</style>",rE:true,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:{script:1}},c:[a],starts:{cN:"javascript",e:"<\/script>",rE:true,sL:"javascript"}},{cN:"vbscript",b:"<%",e:"%>",sL:"vbscript"},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:"[^ />]+"},a]}]}}}();hljs.LANGUAGES.java={dM:{k:{"false":1,"synchronized":1,"int":1,"abstract":1,"float":1,"private":1,"char":1,"interface":1,"boolean":1,"static":1,"null":1,"if":1,"const":1,"for":1,"true":1,"while":1,"long":1,"throw":1,strictfp:1,"finally":1,"protected":1,"extends":1,"import":1,"native":1,"final":1,"implements":1,"return":1,"void":1,"enum":1,"else":1,"break":1,"transient":1,"new":1,"catch":1,"instanceof":1,"byte":1,"super":1,"class":1,"volatile":1,"case":1,assert:1,"short":1,"package":1,"default":1,"double":1,"public":1,"try":1,"this":1,"switch":1,"continue":1,"throws":1},c:[{cN:"javadoc",b:"/\\*\\*",e:"\\*/",c:[{cN:"javadoctag",b:"@[A-Za-z]+"}],r:10},hljs.CLCM,hljs.CBLCLM,hljs.ASM,hljs.QSM,{cN:"class",b:"(class |interface )",e:"{",k:{"class":1,"interface":1},i:":",c:[{b:"(implements|extends)",k:{"extends":1,"implements":1},r:10},{cN:"title",b:hljs.UIR}]},hljs.CNM,{cN:"annotation",b:"@[A-Za-z]+"}]}};hljs.LANGUAGES.php={cI:true,dM:{k:{and:1,include_once:1,list:1,"abstract":1,global:1,"private":1,echo:1,"interface":1,as:1,"static":1,endswitch:1,array:1,"null":1,"if":1,endwhile:1,or:1,"const":1,"for":1,endforeach:1,self:1,"var":1,"while":1,isset:1,"public":1,"protected":1,exit:1,foreach:1,"throw":1,elseif:1,"extends":1,include:1,__FILE__:1,empty:1,require_once:1,"function":1,"do":1,xor:1,"return":1,"implements":1,parent:1,clone:1,use:1,__CLASS__:1,__LINE__:1,"else":1,"break":1,print:1,"eval":1,"new":1,"catch":1,__METHOD__:1,"class":1,"case":1,exception:1,php_user_filter:1,"default":1,die:1,require:1,__FUNCTION__:1,enddeclare:1,"final":1,"try":1,"this":1,"switch":1,"continue":1,endfor:1,endif:1,declare:1,unset:1,"true":1,"false":1,namespace:1,trait:1,"goto":1,"instanceof":1,__DIR__:1,__NAMESPACE__:1,__halt_compiler:1},c:[hljs.CLCM,hljs.HCM,{cN:"comment",b:"/\\*",e:"\\*/",c:[{cN:"phpdoc",b:"\\s@[A-Za-z]+"}]},{cN:"comment",eB:true,b:"__halt_compiler[^;]+;",e:"[\\n\\r]$"},hljs.CNM,hljs.BINARY_NUMBER_MODE,hljs.inherit(hljs.ASM,{i:null}),hljs.inherit(hljs.QSM,{i:null}),{cN:"string",b:'b"',e:'"',c:[hljs.BE]},{cN:"string",b:"b'",e:"'",c:[hljs.BE]},{cN:"string",b:"<<<['\"]?\\w+['\"]?$",e:"^\\w+;",c:[hljs.BE]},{cN:"variable",b:"\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*"},{cN:"preprocessor",b:"<\\?php",r:10},{cN:"preprocessor",b:"\\?>"}]}};hljs.LANGUAGES.python=function(){var a=[{cN:"string",b:"(u|b)?r?'''",e:"'''",r:10},{cN:"string",b:'(u|b)?r?"""',e:'"""',r:10},{cN:"string",b:"(u|r|ur)'",e:"'",c:[hljs.BE],r:10},{cN:"string",b:'(u|r|ur)"',e:'"',c:[hljs.BE],r:10},{cN:"string",b:"(b|br)'",e:"'",c:[hljs.BE]},{cN:"string",b:'(b|br)"',e:'"',c:[hljs.BE]}].concat([hljs.ASM,hljs.QSM]);var b={cN:"title",b:hljs.UIR};var c={cN:"params",b:"\\(",e:"\\)",c:a.concat([hljs.CNM])};return{dM:{k:{keyword:{and:1,elif:1,is:1,global:1,as:1,"in":1,"if":1,from:1,raise:1,"for":1,except:1,"finally":1,print:1,"import":1,pass:1,"return":1,exec:1,"else":1,"break":1,not:1,"with":1,"class":1,assert:1,yield:1,"try":1,"while":1,"continue":1,del:1,or:1,def:1,lambda:1,nonlocal:10},built_in:{None:1,True:1,False:1,Ellipsis:1,NotImplemented:1}},i:"(</|->|\\?)",c:a.concat([hljs.HCM,{cN:"function",b:"\\bdef ",e:":",i:"$",k:{def:1},c:[b,c],r:10},{cN:"class",b:"\\bclass ",e:":",i:"[${]",k:{"class":1},c:[b,c],r:10},hljs.CNM,{cN:"decorator",b:"@",e:"$"}])}}}();hljs.LANGUAGES.sql={cI:true,dM:{i:"[^\\s]",c:[{cN:"operator",b:"(begin|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant)\\b",e:";|$",k:{keyword:{all:1,partial:1,global:1,month:1,current_timestamp:1,using:1,go:1,revoke:1,smallint:1,indicator:1,"end-exec":1,disconnect:1,zone:1,"with":1,character:1,assertion:1,to:1,add:1,current_user:1,usage:1,input:1,local:1,alter:1,match:1,collate:1,real:1,then:1,rollback:1,get:1,read:1,timestamp:1,session_user:1,not:1,integer:1,bit:1,unique:1,day:1,minute:1,desc:1,insert:1,execute:1,like:1,ilike:2,level:1,decimal:1,drop:1,"continue":1,isolation:1,found:1,where:1,constraints:1,domain:1,right:1,national:1,some:1,module:1,transaction:1,relative:1,second:1,connect:1,escape:1,close:1,system_user:1,"for":1,deferred:1,section:1,cast:1,current:1,sqlstate:1,allocate:1,intersect:1,deallocate:1,numeric:1,"public":1,preserve:1,full:1,"goto":1,initially:1,asc:1,no:1,key:1,output:1,collation:1,group:1,by:1,union:1,session:1,both:1,last:1,language:1,constraint:1,column:1,of:1,space:1,foreign:1,deferrable:1,prior:1,connection:1,unknown:1,action:1,commit:1,view:1,or:1,first:1,into:1,"float":1,year:1,primary:1,cascaded:1,except:1,restrict:1,set:1,references:1,names:1,table:1,outer:1,open:1,select:1,size:1,are:1,rows:1,from:1,prepare:1,distinct:1,leading:1,create:1,only:1,next:1,inner:1,authorization:1,schema:1,corresponding:1,option:1,declare:1,precision:1,immediate:1,"else":1,timezone_minute:1,external:1,varying:1,translation:1,"true":1,"case":1,exception:1,join:1,hour:1,"default":1,"double":1,scroll:1,value:1,cursor:1,descriptor:1,values:1,dec:1,fetch:1,procedure:1,"delete":1,and:1,"false":1,"int":1,is:1,describe:1,"char":1,as:1,at:1,"in":1,varchar:1,"null":1,trailing:1,any:1,absolute:1,current_time:1,end:1,grant:1,privileges:1,when:1,cross:1,check:1,write:1,current_date:1,pad:1,begin:1,temporary:1,exec:1,time:1,update:1,catalog:1,user:1,sql:1,date:1,on:1,identity:1,timezone_hour:1,natural:1,whenever:1,interval:1,work:1,order:1,cascade:1,diagnostics:1,nchar:1,having:1,left:1,call:1,"do":1,handler:1,load:1,replace:1,truncate:1,start:1,lock:1,show:1,pragma:1},aggregate:{count:1,sum:1,min:1,max:1,avg:1}},c:[{cN:"string",b:"'",e:"'",c:[hljs.BE,{b:"''"}],r:0},{cN:"string",b:'"',e:'"',c:[hljs.BE,{b:'""'}],r:0},{cN:"string",b:"`",e:"`",c:[hljs.BE]},hljs.CNM,{b:"\\n"}]},hljs.CBLCLM,{cN:"comment",b:"--",e:"$"}]}};hljs.LANGUAGES.ini={cI:true,dM:{i:"[^\\s]",c:[{cN:"comment",b:";",e:"$"},{cN:"title",b:"^\\[",e:"\\]"},{cN:"setting",b:"^[a-z0-9_\\[\\]]+[ \\t]*=[ \\t]*",e:"$",c:[{cN:"value",eW:true,k:{on:1,off:1,"true":1,"false":1,yes:1,no:1},c:[hljs.QSM,hljs.NM]}]}]}};hljs.LANGUAGES.perl=function(){var c={getpwent:1,getservent:1,quotemeta:1,msgrcv:1,scalar:1,kill:1,dbmclose:1,undef:1,lc:1,ma:1,syswrite:1,tr:1,send:1,umask:1,sysopen:1,shmwrite:1,vec:1,qx:1,utime:1,local:1,oct:1,semctl:1,localtime:1,readpipe:1,"do":1,"return":1,format:1,read:1,sprintf:1,dbmopen:1,pop:1,getpgrp:1,not:1,getpwnam:1,rewinddir:1,qq:1,fileno:1,qw:1,endprotoent:1,wait:1,sethostent:1,bless:1,s:1,opendir:1,"continue":1,each:1,sleep:1,endgrent:1,shutdown:1,dump:1,chomp:1,connect:1,getsockname:1,die:1,socketpair:1,close:1,flock:1,exists:1,index:1,shmget:1,sub:1,"for":1,endpwent:1,redo:1,lstat:1,msgctl:1,setpgrp:1,abs:1,exit:1,select:1,print:1,ref:1,gethostbyaddr:1,unshift:1,fcntl:1,syscall:1,"goto":1,getnetbyaddr:1,join:1,gmtime:1,symlink:1,semget:1,splice:1,x:1,getpeername:1,recv:1,log:1,setsockopt:1,cos:1,last:1,reverse:1,gethostbyname:1,getgrnam:1,study:1,formline:1,endhostent:1,times:1,chop:1,length:1,gethostent:1,getnetent:1,pack:1,getprotoent:1,getservbyname:1,rand:1,mkdir:1,pos:1,chmod:1,y:1,substr:1,endnetent:1,printf:1,next:1,open:1,msgsnd:1,readdir:1,use:1,unlink:1,getsockopt:1,getpriority:1,rindex:1,wantarray:1,hex:1,system:1,getservbyport:1,endservent:1,"int":1,chr:1,untie:1,rmdir:1,prototype:1,tell:1,listen:1,fork:1,shmread:1,ucfirst:1,setprotoent:1,"else":1,sysseek:1,link:1,getgrgid:1,shmctl:1,waitpid:1,unpack:1,getnetbyname:1,reset:1,chdir:1,grep:1,split:1,require:1,caller:1,lcfirst:1,until:1,warn:1,"while":1,values:1,shift:1,telldir:1,getpwuid:1,my:1,getprotobynumber:1,"delete":1,and:1,sort:1,uc:1,defined:1,srand:1,accept:1,"package":1,seekdir:1,getprotobyname:1,semop:1,our:1,rename:1,seek:1,"if":1,q:1,chroot:1,sysread:1,setpwent:1,no:1,crypt:1,getc:1,chown:1,sqrt:1,write:1,setnetent:1,setpriority:1,foreach:1,tie:1,sin:1,msgget:1,map:1,stat:1,getlogin:1,unless:1,elsif:1,truncate:1,exec:1,keys:1,glob:1,tied:1,closedir:1,ioctl:1,socket:1,readlink:1,"eval":1,xor:1,readline:1,binmode:1,setservent:1,eof:1,ord:1,bind:1,alarm:1,pipe:1,atan2:1,getgrent:1,exp:1,time:1,push:1,setgrent:1,gt:1,lt:1,or:1,ne:1,m:1};var e={cN:"subst",b:"[$@]\\{",e:"\\}",k:c,r:10};var b={cN:"variable",b:"\\$\\d"};var a={cN:"variable",b:"[\\$\\%\\@\\*](\\^\\w\\b|#\\w+(\\:\\:\\w+)*|[^\\s\\w{]|{\\w+}|\\w+(\\:\\:\\w*)*)"};var h=[hljs.BE,e,b,a];var g={b:"->",c:[{b:hljs.IR},{b:"{",e:"}"}]};var d={cN:"comment",b:"^(__END__|__DATA__)",e:"\\n$",r:5};var f=[b,a,hljs.HCM,d,g,{cN:"string",b:"q[qwxr]?\\s*\\(",e:"\\)",c:h,r:5},{cN:"string",b:"q[qwxr]?\\s*\\[",e:"\\]",c:h,r:5},{cN:"string",b:"q[qwxr]?\\s*\\{",e:"\\}",c:h,r:5},{cN:"string",b:"q[qwxr]?\\s*\\|",e:"\\|",c:h,r:5},{cN:"string",b:"q[qwxr]?\\s*\\<",e:"\\>",c:h,r:5},{cN:"string",b:"qw\\s+q",e:"q",c:h,r:5},{cN:"string",b:"'",e:"'",c:[hljs.BE],r:0},{cN:"string",b:'"',e:'"',c:h,r:0},{cN:"string",b:"`",e:"`",c:[hljs.BE]},{cN:"string",b:"{\\w+}",r:0},{cN:"string",b:"-?\\w+\\s*\\=\\>",r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"("+hljs.RSR+"|split|return|print|reverse|grep)\\s*",k:{split:1,"return":1,print:1,reverse:1,grep:1},r:0,c:[hljs.HCM,d,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[hljs.BE],r:0}]},{cN:"sub",b:"\\bsub\\b",e:"(\\s*\\(.*?\\))?[;{]",k:{sub:1},r:5},{cN:"operator",b:"-\\w\\b",r:0},{cN:"pod",b:"\\=\\w",e:"\\=cut"}];e.c=f;g.c[1].c=f;return{dM:{k:c,c:f}}}();hljs.LANGUAGES.objectivec=function(){var a={keyword:{"false":1,"int":1,"float":1,"while":1,"private":1,"char":1,"catch":1,"export":1,sizeof:2,typedef:2,"const":1,struct:1,"for":1,union:1,unsigned:1,"long":1,"volatile":2,"static":1,"protected":1,bool:1,mutable:1,"if":1,"public":1,"do":1,"return":1,"goto":1,"void":2,"enum":1,"else":1,"break":1,extern:1,"true":1,"class":1,asm:1,"case":1,"short":1,"default":1,"double":1,"throw":1,register:1,explicit:1,signed:1,typename:1,"try":1,"this":1,"switch":1,"continue":1,wchar_t:1,inline:1,readonly:1,assign:1,property:1,protocol:10,self:1,"synchronized":1,end:1,synthesize:50,id:1,optional:1,required:1,implementation:10,nonatomic:1,"interface":1,"super":1,unichar:1,"finally":2,dynamic:2,nil:1},built_in:{YES:5,NO:5,NULL:1,IBOutlet:50,IBAction:50,NSString:50,NSDictionary:50,CGRect:50,CGPoint:50,NSRange:50,release:1,retain:1,autorelease:50,UIButton:50,UILabel:50,UITextView:50,UIWebView:50,MKMapView:50,UISegmentedControl:50,NSObject:50,UITableViewDelegate:50,UITableViewDataSource:50,NSThread:50,UIActivityIndicator:50,UITabbar:50,UIToolBar:50,UIBarButtonItem:50,UIImageView:50,NSAutoreleasePool:50,UITableView:50,BOOL:1,NSInteger:20,CGFloat:20,NSException:50,NSLog:50,NSMutableString:50,NSMutableArray:50,NSMutableDictionary:50,NSURL:50}};return{dM:{k:a,i:"</",c:[hljs.CLCM,hljs.CBLCLM,hljs.CNM,hljs.QSM,{cN:"string",b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"},{cN:"preprocessor",b:"#import",e:"$",c:[{cN:"title",b:'"',e:'"'},{cN:"title",b:"<",e:">"}]},{cN:"preprocessor",b:"#",e:"$"},{cN:"class",b:"interface|class|protocol|implementation",e:"({|$)",k:{"interface":1,"class":1,protocol:5,implementation:5},c:[{cN:"id",b:hljs.UIR}]}]}}}();hljs.LANGUAGES.coffeescript=function(){var d={keyword:{"in":1,"if":1,"for":1,"while":1,"finally":1,"new":1,"do":1,"return":1,"else":1,"break":1,"catch":1,"instanceof":1,"throw":1,"try":1,"this":1,"switch":1,"continue":1,"typeof":1,"delete":1,"debugger":1,"class":1,"extends":1,"super":1,then:1,unless:1,until:1,loop:2,of:2,by:1,when:2,and:1,or:1,is:1,isnt:2,not:1},literal:{"true":1,"false":1,"null":1,"undefined":1,yes:1,no:1,on:1,off:1},reserved:{"case":1,"default":1,"function":1,"var":1,"void":1,"with":1,"const":1,let:1,"enum":1,"export":1,"import":1,"native":1,__hasProp:1,__extends:1,__slice:1,__bind:1,__indexOf:1}};var a="[A-Za-z$_][0-9A-Za-z$_]*";var b={cN:"subst",b:"#\\{",e:"}",k:d,c:[hljs.CNM,hljs.BINARY_NUMBER_MODE]};var c={cN:"string",b:'"',e:'"',r:0,c:[hljs.BE,b]};var h={cN:"string",b:'"""',e:'"""',c:[hljs.BE,b]};var g={cN:"comment",b:"###",e:"###"};var f={cN:"regexp",b:"///",e:"///",c:[hljs.HCM]};var i={cN:"function",b:a+"\\s*=\\s*(\\(.+\\))?\\s*[-=]>",rB:true,c:[{cN:"title",b:a},{cN:"params",b:"\\(",e:"\\)"}]};var e={cN:"javascript",b:"`",e:"`",eB:true,eE:true,sL:"javascript"};return{dM:{k:d,c:[hljs.CNM,hljs.BINARY_NUMBER_MODE,hljs.ASM,h,c,g,hljs.HCM,f,e,i]}}}();hljs.LANGUAGES.apache=function(){var a={cN:"number",b:"[\\$%]\\d+"};return{cI:true,dM:{k:{keyword:{acceptfilter:1,acceptmutex:1,acceptpathinfo:1,accessfilename:1,action:1,addalt:1,addaltbyencoding:1,addaltbytype:1,addcharset:1,adddefaultcharset:1,adddescription:1,addencoding:1,addhandler:1,addicon:1,addiconbyencoding:1,addiconbytype:1,addinputfilter:1,addlanguage:1,addmoduleinfo:1,addoutputfilter:1,addoutputfilterbytype:1,addtype:1,alias:1,aliasmatch:1,allow:1,allowconnect:1,allowencodedslashes:1,allowoverride:1,anonymous:1,anonymous_logemail:1,anonymous_mustgiveemail:1,anonymous_nouserid:1,anonymous_verifyemail:1,authbasicauthoritative:1,authbasicprovider:1,authdbduserpwquery:1,authdbduserrealmquery:1,authdbmgroupfile:1,authdbmtype:1,authdbmuserfile:1,authdefaultauthoritative:1,authdigestalgorithm:1,authdigestdomain:1,authdigestnccheck:1,authdigestnonceformat:1,authdigestnoncelifetime:1,authdigestprovider:1,authdigestqop:1,authdigestshmemsize:1,authgroupfile:1,authldapbinddn:1,authldapbindpassword:1,authldapcharsetconfig:1,authldapcomparednonserver:1,authldapdereferencealiases:1,authldapgroupattribute:1,authldapgroupattributeisdn:1,authldapremoteuserattribute:1,authldapremoteuserisdn:1,authldapurl:1,authname:1,authnprovideralias:1,authtype:1,authuserfile:1,authzdbmauthoritative:1,authzdbmtype:1,authzdefaultauthoritative:1,authzgroupfileauthoritative:1,authzldapauthoritative:1,authzownerauthoritative:1,authzuserauthoritative:1,balancermember:1,browsermatch:1,browsermatchnocase:1,bufferedlogs:1,cachedefaultexpire:1,cachedirlength:1,cachedirlevels:1,cachedisable:1,cacheenable:1,cachefile:1,cacheignorecachecontrol:1,cacheignoreheaders:1,cacheignorenolastmod:1,cacheignorequerystring:1,cachelastmodifiedfactor:1,cachemaxexpire:1,cachemaxfilesize:1,cacheminfilesize:1,cachenegotiateddocs:1,cacheroot:1,cachestorenostore:1,cachestoreprivate:1,cgimapextension:1,charsetdefault:1,charsetoptions:1,charsetsourceenc:1,checkcaseonly:1,checkspelling:1,chrootdir:1,contentdigest:1,cookiedomain:1,cookieexpires:1,cookielog:1,cookiename:1,cookiestyle:1,cookietracking:1,coredumpdirectory:1,customlog:1,dav:1,davdepthinfinity:1,davgenericlockdb:1,davlockdb:1,davmintimeout:1,dbdexptime:1,dbdkeep:1,dbdmax:1,dbdmin:1,dbdparams:1,dbdpersist:1,dbdpreparesql:1,dbdriver:1,defaulticon:1,defaultlanguage:1,defaulttype:1,deflatebuffersize:1,deflatecompressionlevel:1,deflatefilternote:1,deflatememlevel:1,deflatewindowsize:1,deny:1,directoryindex:1,directorymatch:1,directoryslash:1,documentroot:1,dumpioinput:1,dumpiologlevel:1,dumpiooutput:1,enableexceptionhook:1,enablemmap:1,enablesendfile:1,errordocument:1,errorlog:1,example:1,expiresactive:1,expiresbytype:1,expiresdefault:1,extendedstatus:1,extfilterdefine:1,extfilteroptions:1,fileetag:1,filterchain:1,filterdeclare:1,filterprotocol:1,filterprovider:1,filtertrace:1,forcelanguagepriority:1,forcetype:1,forensiclog:1,gracefulshutdowntimeout:1,group:1,header:1,headername:1,hostnamelookups:1,identitycheck:1,identitychecktimeout:1,imapbase:1,imapdefault:1,imapmenu:1,include:1,indexheadinsert:1,indexignore:1,indexoptions:1,indexorderdefault:1,indexstylesheet:1,isapiappendlogtoerrors:1,isapiappendlogtoquery:1,isapicachefile:1,isapifakeasync:1,isapilognotsupported:1,isapireadaheadbuffer:1,keepalive:1,keepalivetimeout:1,languagepriority:1,ldapcacheentries:1,ldapcachettl:1,ldapconnectiontimeout:1,ldapopcacheentries:1,ldapopcachettl:1,ldapsharedcachefile:1,ldapsharedcachesize:1,ldaptrustedclientcert:1,ldaptrustedglobalcert:1,ldaptrustedmode:1,ldapverifyservercert:1,limitinternalrecursion:1,limitrequestbody:1,limitrequestfields:1,limitrequestfieldsize:1,limitrequestline:1,limitxmlrequestbody:1,listen:1,listenbacklog:1,loadfile:1,loadmodule:1,lockfile:1,logformat:1,loglevel:1,maxclients:1,maxkeepaliverequests:1,maxmemfree:1,maxrequestsperchild:1,maxrequestsperthread:1,maxspareservers:1,maxsparethreads:1,maxthreads:1,mcachemaxobjectcount:1,mcachemaxobjectsize:1,mcachemaxstreamingbuffer:1,mcacheminobjectsize:1,mcacheremovalalgorithm:1,mcachesize:1,metadir:1,metafiles:1,metasuffix:1,mimemagicfile:1,minspareservers:1,minsparethreads:1,mmapfile:1,mod_gzip_on:1,mod_gzip_add_header_count:1,mod_gzip_keep_workfiles:1,mod_gzip_dechunk:1,mod_gzip_min_http:1,mod_gzip_minimum_file_size:1,mod_gzip_maximum_file_size:1,mod_gzip_maximum_inmem_size:1,mod_gzip_temp_dir:1,mod_gzip_item_include:1,mod_gzip_item_exclude:1,mod_gzip_command_version:1,mod_gzip_can_negotiate:1,mod_gzip_handle_methods:1,mod_gzip_static_suffix:1,mod_gzip_send_vary:1,mod_gzip_update_static:1,modmimeusepathinfo:1,multiviewsmatch:1,namevirtualhost:1,noproxy:1,nwssltrustedcerts:1,nwsslupgradeable:1,options:1,order:1,passenv:1,pidfile:1,protocolecho:1,proxybadheader:1,proxyblock:1,proxydomain:1,proxyerroroverride:1,proxyftpdircharset:1,proxyiobuffersize:1,proxymaxforwards:1,proxypass:1,proxypassinterpolateenv:1,proxypassmatch:1,proxypassreverse:1,proxypassreversecookiedomain:1,proxypassreversecookiepath:1,proxypreservehost:1,proxyreceivebuffersize:1,proxyremote:1,proxyremotematch:1,proxyrequests:1,proxyset:1,proxystatus:1,proxytimeout:1,proxyvia:1,readmename:1,receivebuffersize:1,redirect:1,redirectmatch:1,redirectpermanent:1,redirecttemp:1,removecharset:1,removeencoding:1,removehandler:1,removeinputfilter:1,removelanguage:1,removeoutputfilter:1,removetype:1,requestheader:1,require:2,rewritebase:1,rewritecond:10,rewriteengine:1,rewritelock:1,rewritelog:1,rewriteloglevel:1,rewritemap:1,rewriteoptions:1,rewriterule:10,rlimitcpu:1,rlimitmem:1,rlimitnproc:1,satisfy:1,scoreboardfile:1,script:1,scriptalias:1,scriptaliasmatch:1,scriptinterpretersource:1,scriptlog:1,scriptlogbuffer:1,scriptloglength:1,scriptsock:1,securelisten:1,seerequesttail:1,sendbuffersize:1,serveradmin:1,serveralias:1,serverlimit:1,servername:1,serverpath:1,serverroot:1,serversignature:1,servertokens:1,setenv:1,setenvif:1,setenvifnocase:1,sethandler:1,setinputfilter:1,setoutputfilter:1,ssienableaccess:1,ssiendtag:1,ssierrormsg:1,ssistarttag:1,ssitimeformat:1,ssiundefinedecho:1,sslcacertificatefile:1,sslcacertificatepath:1,sslcadnrequestfile:1,sslcadnrequestpath:1,sslcarevocationfile:1,sslcarevocationpath:1,sslcertificatechainfile:1,sslcertificatefile:1,sslcertificatekeyfile:1,sslciphersuite:1,sslcryptodevice:1,sslengine:1,sslhonorciperorder:1,sslmutex:1,ssloptions:1,sslpassphrasedialog:1,sslprotocol:1,sslproxycacertificatefile:1,sslproxycacertificatepath:1,sslproxycarevocationfile:1,sslproxycarevocationpath:1,sslproxyciphersuite:1,sslproxyengine:1,sslproxymachinecertificatefile:1,sslproxymachinecertificatepath:1,sslproxyprotocol:1,sslproxyverify:1,sslproxyverifydepth:1,sslrandomseed:1,sslrequire:1,sslrequiressl:1,sslsessioncache:1,sslsessioncachetimeout:1,sslusername:1,sslverifyclient:1,sslverifydepth:1,startservers:1,startthreads:1,substitute:1,suexecusergroup:1,threadlimit:1,threadsperchild:1,threadstacksize:1,timeout:1,traceenable:1,transferlog:1,typesconfig:1,unsetenv:1,usecanonicalname:1,usecanonicalphysicalport:1,user:1,userdir:1,virtualdocumentroot:1,virtualdocumentrootip:1,virtualscriptalias:1,virtualscriptaliasip:1,win32disableacceptex:1,xbithack:1},literal:{on:1,off:1}},c:[hljs.HCM,{cN:"sqbracket",b:"\\s\\[",e:"\\]$"},{cN:"cbracket",b:"[\\$%]\\{",e:"\\}",c:["self",a]},a,{cN:"tag",b:"</?",e:">"},hljs.QSM]}}}();hljs.LANGUAGES.cpp=function(){var a={keyword:{"false":1,"int":1,"float":1,"while":1,"private":1,"char":1,"catch":1,"export":1,virtual:1,operator:2,sizeof:2,dynamic_cast:2,typedef:2,const_cast:2,"const":1,struct:1,"for":1,static_cast:2,union:1,namespace:1,unsigned:1,"long":1,"throw":1,"volatile":2,"static":1,"protected":1,bool:1,template:1,mutable:1,"if":1,"public":1,friend:2,"do":1,"return":1,"goto":1,auto:1,"void":2,"enum":1,"else":1,"break":1,"new":1,extern:1,using:1,"true":1,"class":1,asm:1,"case":1,typeid:1,"short":1,reinterpret_cast:2,"default":1,"double":1,register:1,explicit:1,signed:1,typename:1,"try":1,"this":1,"switch":1,"continue":1,wchar_t:1,inline:1,"delete":1,alignof:1,char16_t:1,char32_t:1,constexpr:1,decltype:1,noexcept:1,nullptr:1,static_assert:1,thread_local:1,restrict:1,_Bool:1,complex:1},built_in:{std:1,string:1,cin:1,cout:1,cerr:1,clog:1,stringstream:1,istringstream:1,ostringstream:1,auto_ptr:1,deque:1,list:1,queue:1,stack:1,vector:1,map:1,set:1,bitset:1,multiset:1,multimap:1,unordered_set:1,unordered_map:1,unordered_multiset:1,unordered_multimap:1,array:1,shared_ptr:1}};return{dM:{k:a,i:"</",c:[hljs.CLCM,hljs.CBLCLM,hljs.QSM,{cN:"string",b:"'\\\\?.",e:"'",i:"."},{cN:"number",b:"\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"},hljs.CNM,{cN:"preprocessor",b:"#",e:"$"},{cN:"stl_container",b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:a,r:10,c:["self"]}]}}}();