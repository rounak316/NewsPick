// var MongoDB = require('./MongoDB/initConnection.js')

// var MongoDB = require('./MongoDB/initConnection.js')
var SUB_ARTICLESchema = require('./MongoDB/Subarticles.js').ArticleSchema
var mongoose = require('mongoose')


var SubArticleModel = mongoose.model('ARTICLE', ARTISUB_ARTICLESchemaCLESchema);
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
  

    DownloadArticle(_article , "tmpArticleStorage/downloadedPic.jpg", _article.Location , success , failure)
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

//COVERTER
ShellHandler('sh ./test.sh "'  +  _article.splitter_data + '"' , function(){   uploadAllArticles( _article , success , failure )    } , failure )


}


function StartJob(success , failure)
{

setTimeout(function(){ JobToConvertPDF(success , failure) } , 1000);


}


function DownloadArticle(_article , tmp_file_article, url_sub_article , success , failure)
{


ShellHandler('curl -o '+ tmp_file_article+' ' + url_sub_article  ,function(){  ShellJobSplitIntoSubArticle(_article , success , failure)  } , failure )


}

function CutArticles(tmp_file_article , splitter_data , success , failure )
{

ShellHandler('sh ./test.sh "' + splitter_data + '"' ,success , failure )
}


function UploadAllArticles(_article , success , failure )
{


awsuploadAll(_article , success , failure  , Articles , 'Articles/');

}


StartJob( success , failure);


exports.StartJob = StartJob
