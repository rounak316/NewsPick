var MongoDB = require('./MongoDB/initConnection.js')
var PDFSchema = require('./MongoDB/PDFSchema.js').PDF
var mongoose = require('mongoose')
var PDFModel = mongoose.model('PDF', PDFSchema);





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



function ShellJob(param , callback)
{
	console.log('1.' +'Shell Job')


//callback is neccesary to be called

function random()
{
return Math.round(Math.random(1,2) )

}

function success()
{

	console.log('success Conversion')
//HANDLE SUCCESS
var query = PDFModel.findOneAndUpdate({_id: param._id },  {$set:{status:2}} , {new: true}  );

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

var num = random();
if(num==0)
{
success()
}
else
{
failure();
}

}


setTimeout(ShellScript , 3000);





}


function StartJob()
{
setTimeout( JobToConvertPDF , 1000);
}




exports.StartJob = StartJob