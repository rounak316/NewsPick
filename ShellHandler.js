const exec = require('child_process').exec;


var TAGGED_ARTICLE_CUTTER = [];

function cmd(command , success , failure)
{


const child = exec(command, function(error, stdout, stderr) {




  if (stderr) {

  	//Failed
  	console.log('Error ' ,stderr)
  	failure();
    
  }
  else

  {
  	//Success
  	success(stdout)

  }
});


if(TAGGED_ARTICLE_CUTTER.length>0)
TAGGED_ARTICLE_CUTTER[ TAGGED_ARTICLE_CUTTER.length - 1 ] = child.pid;
else
TAGGED_ARTICLE_CUTTER[ TAGGED_ARTICLE_CUTTER.length - 1 ] = child.pid;



}
function kill(article)
{

//if(TAGGED_ARTICLE_CUTTER != null)

}



exports.exec = cmd;

