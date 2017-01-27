var fs = require('fs');







function readSVGData(File ,   success)
{

		

 File= "Svg" + File;

var contents = fs.readFileSync(File).toString();


success(contents)

}

exports.readSVGData=readSVGData
