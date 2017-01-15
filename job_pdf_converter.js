var MongoDB = require('./MongoDB/initConnection.js')
var PDFSchema = require('./MongoDB/PDFSchema.js').PDF
var mongoose = require('mongoose')
var PDFModel = mongoose.model('PDF', PDFSchema);
var ShellHandler = require('./ShellHandler').exec

var awsUpload = require('./aws.js').upload
var awsDownload = require('./aws.js').download
var awsuploadAll = require('./aws.js').uploadAll


function JobToConvertPDF()
{

var query = PDFModel.findOneAndUpdate({ status:0 } , {$set:{status:1}}, {new: true}  );


// execute the query at a later time
query.exec(function (err, person) {
  if (err) {
console.log('Error Encountered')
StartJob();
return;
  }
else
{
  if(person)
  {
  

  	ShellJob(person ,StartJob);
  }
  else
  {
  	console.log('Nothing Found')
  	StartJob();


  }
}

 // Space Ghost is a talk show host.
})








}


var TMP_PDF_FILE = "tmpPDF.pdf"


function PreShellJob(param , success , failure)
{



awsDownload({ Bucket:param.Bucket , Key:param.Key } , function(){success();console.log('success')} , failure)

}


function ShellJob(param , callback)
{
	console.log('1.' +'Shell Job')


//callback is neccesary to be called


function postSuccessUpload(callback)
{



awsuploadAll();


}


function success()
{

	console.log('success Conversion')
//HANDLE SUCCESS
var query = PDFModel.findOneAndUpdate({_id: param._id },  {$set:{status:2}} , {new: true}  );

query.exec(function (err, person){

  if (err) {

console.log(err)

callback()
  }

  else{

  	// awsUpload('log.ass' , 'testUpload/' , 'log.ass' , callback)


 postSuccessUpload(callback);

// console.log(person)

  }



});

}

function failure()
{

console.log('Failed Conversion')
// HANDLE FAILURE

var query = PDFModel.findOneAndUpdate({_id: param._id },  {$set:{status:3}} , {new: true}  );

query.exec(function (err, person){

  if (err) {
console.log(err)
  }
  else{

// console.log(person)

  }



callback()
});

}


function ShellScript()
{

ShellHandler('dir', success , failure)
}






PreShellJob(param , ShellScript ,failure );




}


function StartJob()
{
setTimeout( JobToConvertPDF , 1000);
}




exports.StartJob = StartJob

