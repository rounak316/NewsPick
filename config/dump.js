var config_quality= require('./quality.json');

var qualities = (config_quality["qualities"]);
var file = require("fs");

var quality = qualities.pop()
var content =config_quality[quality] ;

writeToFile( quality ,  content );




function writeToFile(file_name    , content)
{

console.log(file_name)

if(!file_name)
{

	console.log('done biatch')
	return;
}

 file.writeFileSync(file_name, content);
 
console.log(" done ...");
var quality = qualities.pop()
var content =config_quality[quality] ;

writeToFile( quality ,  content );





}

