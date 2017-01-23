// var MongoDB = require('./MongoDB/initConnection.js')

var MongoDB = require('./MongoDB/initConnection.js')
var SUB_ARTICLESchema = require('./MongoDB/Subarticles.js').SubArticleSchema
var mongoose = require('mongoose')


var SubArticleModel = mongoose.model('ARTICLES', SUB_ARTICLESchema);
var ShellHandler = require('./ShellHandler').exec

var awsUpload = require('./aws.js').upload
var awsDownload = require('./aws.js').download
var awsuploadAll = require('./aws.js').uploadAllArticles



function JobToConvertPDF( success , failure )
{



var query = SubArticleModel.findOneAndUpdate({ status:0 } , {$set:{status:1}}, {new: true}  );


query.exec(function (err, _article) {
  if (err) {
console.log('Error Encountered')
StartJob( success , failure );
return;
  }
else
{

  if(_article)
  {
  

    DownloadArticle(_article , "pic.jpg", _article.Location , success , failure)
  }
  else
  {
    // console.log('Nothing Found')
    StartJob(success , failure );


  }
}

 // Space Ghost is a talk show host.
})








}

function ShellJobSplitIntoSubArticle(_article , success , failure)
{

console.log('sh ./test.sh "'  +  _article.splitter_data + '"' )

//COVERTER
ShellHandler('sh ./test.sh "'  +  _article.splitter_data + '"' , function(){   UploadAllArticles( _article , success , failure )    } , failure )


}


function StartJob(success , failure)
{

setTimeout(function(){ JobToConvertPDF(success , failure) } , 1000);


}


function DownloadArticle(_article , tmp_file_article, url_sub_article , success , failure)
{


url_sub_article ="https://prakhargyan.s3.ap-south-1.amazonaws.com/" + url_sub_article
console.log('sh ./downloadFile.sh '  + url_sub_article )


ShellHandler('sh ./downloadFile.sh '  + url_sub_article  ,function(){ console.log('success'); ShellJobSplitIntoSubArticle(_article , success , failure)  } , function(){  console.log('fail');failure();} )


}

function CutArticles(tmp_file_article , splitter_data , success , failure )
{

ShellHandler('sh ./test.sh "' + splitter_data + '"' ,success , failure )
}


function UploadAllArticles(_article , success , failure )
{


awsuploadAll(_article , success , failure   , 'Articles');

}


StartJob( function(){console.log('success')} , function(){console.log('failure')} );


exports.StartJob = StartJob
