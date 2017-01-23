var MongoDB = require('./MongoDB/initConnection.js')
var ShellHandler = require('./ShellHandler').exec
var express = require('express')
var app = express()

var bodyParser = require('body-parser');

var request = require('request');




//Job
var JobPDF = require('./job_pdf_converter').StartJob

var Article_cutter_job = require('./article_cutter_job').StartJob

var ArticleConverter = require('./ArticleConverter').StartJob



//





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



app.get('/getPdfStream/:folder', function (req, res) {

  var folder = req.params.folder



MongoDB.pdf_find_by_folder(res , folder)



})



app.get('/getArticles/:id', function (req, res) {

  var _id = req.params.id



MongoDB.pdf_find_articles(res , _id)



})



app.post('/splitArticles', function (req, res) {


var _splitter_data = req.body.splitter_data;

var splitter_data =""
for(var a of _splitter_data)
{

for(var b of a)
{


splitter_data+=b+"|"

}

splitter_data=splitter_data.slice( 0 , splitter_data.length-1)

splitter_data+="_"


}
splitter_data=splitter_data.slice( 0 , splitter_data.length-1)


var pdf_id = req.body.pdf_id;
var page_no = req.body.page_no;
var url = req.body.url
var quality = req.body.quality


if( !splitter_data || !pdf_id || !page_no || !url || !quality )
{
throw new Error()
return
}




function failure()
{
console.log('no')
}


function success()
{

ArticleConverter( 'sh ./test.sh '  + splitter_data  , function() {console.log('yes');} , failure )
}


// ShellHandler('sh ./downloadFile.sh ' + req.body.url ,success , failure )


try
{
MongoDB.splitArticles(res,req.body)
}
catch( err)
{

  res.send('{}')


}



})


app.post('/uploadPDF', function (req, res) {

var params = {
  Bucket: req.body.Bucket, /* required */
  Key: req.body.Key, /* required */
  Folder: req.body.Folder
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

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})



