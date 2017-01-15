const exec = require('child_process').exec;
function cmd(command , success , failure)
{
const child = exec(command, (error, stdout, stderr) => {
  if (stderr) {

  	//Failed
  	console.log('Error ' ,stderr)
  	failure();
    
  }
  else

  {
  	//Success
  	success()

  }
});

}

exports.exec = cmd;