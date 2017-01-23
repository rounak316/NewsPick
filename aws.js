var FilePath  = "pic.jpg"
var ListFiles = require('./readAllFile.js').readAllFile
var AWS = require('aws-sdk');
var fs = require('fs')
var mongoose = require('mongoose')
var PDFSchema = require('./MongoDB/PDFSchema.js').PDF
var PDFModel = mongoose.model('PDF', PDFSchema);

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


function uploadAll(_pdf , success , failure, Articles)
{

    var dir = 'ShellImages/' + _pdf.Folder+'/'+_pdf._id ;
var Files = [];
Files = ListFiles(dir);
console.log(dir)

console.log(_pdf)
uploadForLoop( _pdf ,   success , failure,Articles , Files );



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


exports.upload = upload;



exports.uploadAll = uploadAll;

exports.download = download;


