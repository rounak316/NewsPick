var FilePath  = "pic.jpg"
var ListFiles = require('./readAllFile.js').readAllFile
var AWS = require('aws-sdk');
var fs = require('fs')


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


function _upload(inpFilePath , outCloudPath  ,success, failure)
{
    var bodystream = fs.createReadStream(inpFilePath);

    var params = {
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
     uploadForLoop(success , failure)


}




       
     }) 

 }



var Files = [];
function uploadForLoop(success , fail)
{


var File = Files.pop();
if(File)
{
_upload(File , File, success , fail)
}
else
{
success();
    //All Uploaded
}



}


function uploadAll(dir , success , failure)
{

Files = ListFiles(dir);

uploadForLoop(   success , failure );



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


exports.upload = upload;



exports.uploadAll = uploadAll;

exports.download = download;


