
var ShellHandler = require('./ShellHandler').exec



function ShellScript(cmd , success ,failure)
{
  
console.log(cmd)
ShellHandler(cmd, success , failure)


}









exports.StartJob = ShellScript

