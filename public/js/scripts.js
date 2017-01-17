

function datePicker()
{

	var DatePicker = $('#date')[0];
DatePicker.onchange = function()
{


getPDFS(  DatePicker.value)
}


}


function getPDFS(Folder)
{

	console.log('3424')

	$.ajax({
    url: '/getPdfStream/' + Folder ,
    type: 'GET',
    success: function(data){ 

('.list-group')[0].innerHTML = "";

for(pdf of data)
{
console.log('data')
console.log(pdf)
var status = pdf.status;

console.log(status)


var child =  $("#model" + status).clone();
console.log(child)

child[0].removeAttribute('class');


child.appendTo('.list-group');



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


function fileUploadUI()
{

$("#virtual_fileUpload")[0].onclick =function(){ $("#fileUpload")[0].click(); };



var fileUpload = $("#fileUpload")[0]
fileUpload.onchange= function()
{

var Files = fileUpload.files;



for(File of Files)
{

	var child = $('#progressModel').clone()


child[0].removeAttribute('class');

	child.appendTo($('#fileHolder')[0])

	console.log(File)
}
fileUpload.value = '';
}


}

 fileUploadUI()
datePicker()