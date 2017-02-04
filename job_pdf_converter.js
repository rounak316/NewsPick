// var MongoDB = require('./MongoDB/initConnection.js')
var PDFSchema = require('./MongoDB/PDFSchema.js').PDF
var MongoDB = require('./MongoDB/initConnection.js')
var ARTICLESchema = require('./MongoDB/ARTICLESchema.js').ArticleSchema
var mongoose = require('mongoose')

var PDFModel = mongoose.model('PDF', PDFSchema);
var ARTICLEModel = mongoose.model('ARTICLE', ARTICLESchema);
var ShellHandler = require('./ShellHandler').exec

var awsUpload = require('./aws.js').upload
var awsDownload = require('./aws.js').download
var awsuploadAll = require('./aws.js').uploadAll


function JobToConvertPDF()
{

var query = PDFModel.findOneAndUpdate({ status:0 } , {$set:{status:1}}, {new: true}  );


// execute the query at a later time
query.exec(function (err, _pdf) {
  if (err) {
console.log('Error Encountered')
StartJob();
return;
  }
else
{
  if(_pdf)
  {
  
console.log('Found Sometging')
  	ShellJob(_pdf ,StartJob);
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


function postSuccessUpload(_pdf , success , failure , Articles)
{



awsuploadAll(_pdf , success , failure  , Articles , 'ShellImages/');


}



function success(shell_output)
{


var ARTICLES_SHELL_OUTPUT_1 = shell_output.split("\n")

var Articles = {}



var OBJECT_IDS = []


for(var pop in ARTICLES_SHELL_OUTPUT_1[0].split('||') )
{
OBJECT_IDS[pop] = mongoose.Types.ObjectId();
}



for(var _tmp of ARTICLES_SHELL_OUTPUT_1)
{
  var ARTICLES_SHELL_OUTPUT_2 = _tmp.split("||");

    var QUALITY = ARTICLES_SHELL_OUTPUT_2[0];


   var ARTICLES_QUALITY = ARTICLES_SHELL_OUTPUT_2.splice(1,ARTICLES_SHELL_OUTPUT_2.length ) ;




for(var tmp_i in ARTICLES_QUALITY)
{

ARTICLES_QUALITY[tmp_i] = new ARTICLEModel({_id: OBJECT_IDS[tmp_i] ,  Page:(tmp_i+1) ,Quality: QUALITY , Image:ARTICLES_QUALITY[tmp_i] });

}

Articles[QUALITY] = ARTICLES_QUALITY




}




	console.log('success Conversion' )




//HANDLE SUCCESS
var query = PDFModel.findOneAndUpdate({_id: param._id },  {$set:{status:4 } }, {new: true}  );

query.exec(function (err, _pdf){

  if (err) {

console.log(err)

callback()
  }

  else{

  	// awsUpload('log.ass' , 'testUpload/' , 'log.ass' , callback)


 postSuccessUpload(_pdf, callback , failure , Articles );

// console.log(_pdf)

  }



});

}

function failure()
{


console.log('Failed Conversion')
// HANDLE FAILURE

var query = PDFModel.findOneAndUpdate({_id: param._id },  {$set:{status:3}} , {new: true}  );

query.exec(function (err, _pdf){

  if (err) {
console.log(err)
  }
  else{

// console.log(_pdf)

  }



callback()
});

}


function ShellScript()
{
console.log('issuing' + param.Folder)
ShellHandler('sh PdfToImage.sh in.pdf "' + param.Folder+'/'+param._id + '"', success , failure)
}






PreShellJob(param , ShellScript ,failure );




}


function StartJob()
{
setTimeout( JobToConvertPDF , 1000);
}

StartJob();




