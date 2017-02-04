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



function sendFlagUploadPDF(data , success_cb, failure_cb)
{

$.ajax({
  type: "POST",
  url: '/uploadPDF',
  data: data,
  success: function(data){
console.log(data)

success_cb();



  },
      error: function(data) {

        failure_cb();
        console.log(error); //or whatever

    }


});

}


function removeElement(element)
{

 element.fadeOut( function() { $(this).remove(); });
}


function addPhoto(albumName , file , element , folder) {

   var progessbar =  $(element).find('.progress-bar')[0];

progessbar.style.width="0%"
    console.log(element)

  s3.upload({
    Bucket:albumBucketName,
    Key: albumName,
    Body: file,
    ACL: 'public-read'
  }, function(err, data) {
    if (err) {
      


      return console.log('There was an error uploading your photo: ', err.message);




    }
    console.log('Successfully uploaded photo.' );

data.Folder = folder;
console.log(data)
sendFlagUploadPDF(data , function(){ removeElement( element ); getPDFS(  getDate() ) ;/*Success Callback*/}  , function(){});
  

   
  }).on('httpUploadProgress', function(progress) {
console.log((progress.loaded / progress.total * 100) +"%");

var _prog =  (progress.loaded / progress.total * 100) 
_prog = Number.parseInt(_prog)

if (Number.isInteger( ( _prog )  ) )
{
progessbar.style.width=  _prog +"%"
}



    // console.log(progress)
    // Here you can use `this.body` to determine which file this particular
    // event is related to and use that info to calculate overall progress.
});;
}

var CurrentDate = null;


function setDefaultDateToToday()
{
    var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = yyyy+'-'+mm+'-'+dd;

$('#date').attr('value', today);

$('#date')[0].onchange()

console.log(today)
getPDFS(  today);


}

function datePicker()
{


	var DatePicker = $('#date')[0];
DatePicker.onchange = function()
{
console.log('new date set ' + DatePicker.value)
CurrentDate = DatePicker.value;

getPDFS(  getDate() );


}

setDefaultDateToToday();


}


function checkForPDFStatus( status , element  , pdf)
{



if(status != 4 || status != -1)
setTimeout(  function(){

  $.ajax({
    url: '/checkPDFStatus/' + pdf._id ,
    type: 'GET',
    success: function(data){ 

if( data.status ==4 )
{

console.log('checked');
}
else
{
console.log('checking');
checkForPDFStatus( status , element  , pdf)
return

}

    },

      error: function(error) {

console.log('checking error');
checkForPDFStatus( status , element  , pdf)
return

       }





});


}  ,2000)

}


function getPDFS(Folder)
{

Folder = Folder.replace(/-/g ,'' , true)

	console.log(Folder)

	$.ajax({
    url: '/getPdfStream/' + Folder ,
    type: 'GET',
    success: function(data){ 

$('.addedData').remove()

for(pdf of data)
{

var status = (pdf.status);
console.log('appending' + status)


var child =  $("#model" + status).clone();
console.log(child)

child[0].removeAttribute('class');
child[0].setAttribute('class' , 'addedData');
var URL_REDIRECT = '/?article_id=' + pdf._id;

child.find('#edit')[0].setAttribute('href', URL_REDIRECT)

child.appendTo('#data-pdf');

checkForPDFStatus( status, child , pdf )

}


    },
    error: function(data) {
setTimeout(  function(){ getPDFS(Folder) }  , 3000);

        console.log('woops!'); //or whatever
    }
});





}


function enListPDF(PDF)
{


}


function getDate()
{
    if(CurrentDate)
    {
CurrentDate = CurrentDate.replace(/-/g , '' , true);
return CurrentDate;
}
else
{
return null;

}
}

function fileUploadUI()
{



$("#virtual_fileUpload")[0].onclick =function(){ $("#fileUpload")[0].click(); };



var fileUpload = $("#fileUpload")[0]
fileUpload.onchange= function()
{


var date_tmp =getDate();
if(!date_tmp)
    {
fileUpload.value = '';
        console.log('Select A date' + date_tmp)
    return;
}
var Files = fileUpload.files;



for(File of Files)
{

	var child = $('#progressModel').clone()


child[0].removeAttribute('class');

// child[0].setAttribute('class','list-group-item');

	child.appendTo($('#fileHolder')[0])

	console.log(File);

$(child).find('.card-text')[0].innerHTML= File.name

    addPhoto( 'PDF/' + date_tmp + "/"+ Date.now() + ".pdf" ,  File , child  , date_tmp)


}
fileUpload.value = '';
}


}
datePicker()

 fileUploadUI()
