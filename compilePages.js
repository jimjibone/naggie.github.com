/*

Copyright Callan Bryant 2011 <callan.bryant@gmail.com> http://callanbryant.co.uk

Compiles all markdown files in pages/ into pages.json

  * The service name is defined by the filename (something.md)
  * Pragma is @variable value, at the start of the file. Available pragma:

Synchronous but meh.

@url http://google.com
@hotkey g
*/

var fs = require('fs');
var services = {};
var dir = __dirname+'/pages/';
var files = fs.readdirSync(dir);
var outputFile = __dirname+'/pages.json';

for (var i in files)
{
	// get the absolute filepath
	var file = dir+files[i];

	// check the extension
	if (!file.match(/\.md$/i))
		continue;

	// extract the service name from the filename
	var name = files[i].split('.')[0];

	// read in the file
	data = fs.readFileSync(file,'ascii');

	// read and remove pragma, remove commenrs
	var pragma = parsePragma(data);
	var description = data.replace(/^@.*\n/igm,'');

	// add it to the services object
	services[name] = {
		url:pragma.url,
		description: description,
		hotkey:pragma.hotkey,
		primary:pragma.primary
	};
}

//console.log(services);

// write the file
fs.writeFile(outputFile, JSON.stringify(services),function(err)
{
	if (err)
		console.error(err);

	console.log('Done compiling pages.json')
});



function parsePragma(doc){
	var pragma = {};

	// match only pragma lines
	var lines = doc.match(/^@[a-z]+( .+)?$/igm);

	for (var i in lines)
	{
		var line = lines[i];

		// remove @
		var line = line.replace(/^@/,'');

		// split by space
		var bits = line.split(' ');

		if (!bits[1])
			bits[1] = true;

		// 0 is key, 1 is val
		pragma[bits[0]] = bits[1];
	}

	return pragma;
}
