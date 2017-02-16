var a = 1;

var b = "append1"
setInterval( function(){ console.log(b , a); a++; } , 500);

exports.boom = function(pop){ b=pop }