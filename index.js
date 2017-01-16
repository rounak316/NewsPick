var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var MongoDB = require('./MongoDB/initConnection.js')
var request = require('request');




//Job
var JobPDF = require('./job_pdf_converter').StartJob
JobPDF()

//







// app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));



app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(800, function () {
  console.log('Example app listening on port 3000!')
})



app.get('/getPdfStream', function (req, res) {

console.log('ddsa')

MongoDB.pdf_find_by_folder(res)



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
request.head( url , function (error, response, body) {

if(error)
{
	var output = {}
    // Handle no object on cloud here 
     output.status="failure";
      res.send(output)
      return;
}

else
{
var status =	response.statusCode || error
if(status==200)
{
var output =params
output.status ="success" 


MongoDB.pdf_save(req.body);

res.send(output)

}
else
{
 	var output = {}
    // Handle no object on cloud here 
     output.status="failure";
      res.send(output)
}


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





