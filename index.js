var express = require('express')
var app = express()
var bodyParser = require('body-parser');
// var MongoDB = require('./MongoDB/initConnection.js')

var request = require('request');



var albumBucketName = 'prakhargyan';
var bucketRegion = 'us-west-2';
var IdentityPoolId = 'us-west-2:a27fe5b3-7d29-458b-a789-21ebf22afd94';


var AWS = require('aws-sdk');
AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({signatureVersion: 'v4',
  params: {Bucket: albumBucketName}
});


function checkIfUrlExists(url)
{

request( url , function (error, response, body) {
console.log(response.statusCode)
return  200;
})


}



// app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(80, function () {
  console.log('Example app listening on port 3000!')
})







app.post('/uploadPDF', function (req, res) {

var params = {
  Bucket: req.body.Bucket, /* required */
  Key: req.body.Key, /* required */
};





var url = (req.body.Location);
  	
  	// output.Location=req.body.Location
if(url)
{
request( url , function (error, response, body) {

var status =	response.statusCode
if(status==200)
{
var output =params
output.status ="success" 
res.send(output)

}
else
{
 	var output = {}
    // Handle no object on cloud here 
     output.status="failure";
      res.send(output)
}

});

}
else
{
	var output = {}
    // Handle no object on cloud here 
     output.status="failure";
      res.send(output)
}




  
})