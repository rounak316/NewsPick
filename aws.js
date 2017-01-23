var FilePath  = "pic.jpg"
var ListFiles = require('./readAllFile.js').readAllFile
var AWS = require('aws-sdk');
var fs = require('fs')
var mongoose = require('mongoose')
var PDFSchema = require('./MongoDB/PDFSchema.js').PDF
var PDFModel = mongoose.model('PDF', PDFSchema);


var SubArticleSchema = require('./MongoDB/Subarticles.js').SubArticleSchema
var SubArticleModel = mongoose.model('ARTICLES', SubArticleSchema);

     //aws credentials
var albumBucketName = 'prakhargyan';
var bucketRegion = 'us-west-2';
var IdentityPoolId = 'us-west-2:a27fe5b3-7d29-458b-a789-21ebf22afd94';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

    var s3 = new AWS.S3({signatureVersion: 'v4'});






function upload(inpFilePath , outCloudPath , name ,success, failure)
{
    var bodystream = fs.createReadStream(inpFilePath);

    var params = {
      ACL: 'public-read',
        'Bucket': 'prakhargyan',
        'Key':outCloudPath + name,
        'Body': bodystream,
        'ContentEncoding': 'base64', 
        'ContentType ': 'image/jpeg'
     };

     //also tried with s3.putObject
     s3.upload(params, function(err, data){

if(err)
{
	failure();
  console.log('S3 Upload Error : ', err);
}
else
{

     console.log('S3 Upload Success : ',data);
     success()


}




       
     }) 

 }


function _upload(_pdf , inpFilePath , outCloudPath  ,success, failure , Articles , Files)
{
    var bodystream = fs.createReadStream(inpFilePath);

    var params = {
       ACL: 'public-read',
        'Bucket': 'prakhargyan',
        'Key':outCloudPath ,
        'Body': bodystream,
        
        'ContentType ': 'image/png'
     };

     //also tried with s3.putObject
     s3.upload(params, function(err, data){

if(err)
{
    failure();
  console.log('S3 Upload Error : ', err);
}
else
{

     console.log('S3 Upload Success : ',data);
     uploadForLoop(_pdf , success , failure , Articles , Files)


}




       
     }) 

 }




function uploadForLoop(_pdf , success , fail , Articles , Files)
{


var File = Files.pop();
if(File)
{
_upload(_pdf , File , File, success , fail ,Articles  , Files)
}
else
{
console.log(';;;')
console.log(Articles)


// var query = PDFModel.findOneAndUpdate({_id:_pdf._id}, {$set:{Articles:Articles ,  ArticlesHD : Articles["HD"] ,  ArticlesFD:Articles["FD"]  ,  ArticlesSD:Articles["SD"]   ,  ArticlesTHUMB:Articles["THUMB"] } }, {new: true}  );

var query = PDFModel.findOneAndUpdate({_id:_pdf._id}, {$set:{Articles:Articles } }, {new: true}  );


console.log(_pdf)

// execute the query at a later time
query.exec(function (err, _pdf) {
  if (err) {
console.log('Error Encountered: '  + err)
fail();
return;
  }
else
{

  console.log(_pdf)
 
  success();

 
}

 // Space Ghost is a talk show host.
})
//Update MoongoPDF of Articles Ulaoded to s3


    //All Uploaded
}



}


function uploadAll(_pdf , success , failure, Articles , _dir)
{

    var dir = _dir + _pdf.Folder+'/'+_pdf._id ;
var Files = [];
Files = ListFiles(dir);
console.log(dir)

console.log(_pdf)
uploadForLoop( _pdf ,   success , failure,Articles , Files );



}


function uploadAllArticles(_article , success , failure , _dir)
{

    var dir = dir='Articles/';
var Files = [];
Files = ListFiles(dir);



uploadForLoopForArticle( _article ,   success , failure , Files );



}


function fromCache(params, success , failure)
{



}

function download(params , success , failure)
{


// var params = {Bucket: 'prakhargyan', Key: 'testUpload//epf report.pdf'};
var file = require('fs').createWriteStream('in.pdf');



console.log(params)

s3.getObject(params).createReadStream().on('error', function(err){console.log(err);failure()  }  ).on('end' , function(){console.log('successfull downloaded ! ') ;success()}).pipe(file)




}


function uploadMultiple(inpFilePath , outCloudPath , name ,success, failure)
{



    
}




function _uploadArticle(_article , inpFilePath , outCloudPath  ,success, failure  , Files , Responses)
{
    var bodystream = fs.createReadStream(inpFilePath);

    var params = {
       ACL: 'public-read',
        'Bucket': 'prakhargyan',
        'Key':outCloudPath ,
        'Body': bodystream,
        
        'ContentType ': 'image/png'
     };

     //also tried with s3.putObject
     s3.upload(params, function(err, data){

if(err)
{
    failure();
  console.log('S3 Upload Error : ', err);
}
else
{

     console.log('S3 Upload Success : ',data);

     Responses.push(data)
     uploadForLoopForArticle(_article , success , failure  , Files, Responses)


}




       
     }) 

 }



 function uploadForLoopForArticle(_article ,  success , fail  , Files , Responses)
{
Responses = Responses || []



var File = Files.pop();
var output_dir= _article.pdf_id + "/" + _article.article_id + "/" + _article.quality +'/';


if(File)
{

_uploadArticle( _article , File ,output_dir+ File, success , fail   , Files , Responses)

}
else
{



var query = SubArticleModel.findOneAndUpdate({_id:_article._id}, {$set:{status:2  , SubArticlesImages: Responses} }, {new: true}  );


// execute the query at a later time
query.exec(function (err, _article) {
  if (err) {
console.log('Error Encountered: '  + err)
fail();
return;
  }
else
{

  console.log(_article)
 
  success();

 
}

 // Space Ghost is a talk show host.
})
//Update MoongoPDF of Articles Ulaoded to s3


    //All Uploaded
}



}




exports.upload = upload;



exports.uploadAll = uploadAll;

exports.download = download;


exports.uploadAllArticles = uploadAllArticles;

