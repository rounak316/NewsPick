var Data_Pic_Images = [];
var CURRENT_PAGE = 0;




function initPublishButton()
{


var splitter_data = CLIPBOARD
var pdf_id =  Data_Pic_Images._id;

var page_no = page;
var url = "URL";
var quality = "FD";
var article_id =  Data_Pic_Images.Articles[quality][page]._id;
var Location = Data_Pic_Images.Articles[quality][page].Image;


var body = {


article_id :article_id ,
page_no: page_no,
url:url,
splitter_data:splitter_data,
quality:quality,
pdf_id:pdf_id,
Location:Location


}



postSplitterData(body)








}

function CarouselInit(img_ar)
{

for(var img of img_ar)
{
var par = document.createElement('div')
par.setAttribute('class' , 'carousel-item active slide')
var _img = document.createElement('img')
_img.setAttribute('class' , 'd-block img-fluid slide')
_img.setAttribute('src',"https://prakhargyan.s3.ap-south-1.amazonaws.com/" + img.Image)
par.append(_img)


par.setAttribute('onclick' ,'alert(123)'  )


}

console.log(par)

$('.carousel-inner.slide').append(par)
}



function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function initPage(callback )
{

page  = page || 0;

CURRENT_PAGE = page;

var article_id = getParameterByName('article_id')

$.ajax({
    url: '/getArticles/'+article_id,
    type: 'GET',
    success: function(data){ 

        if(!$.isEmptyObject( data ))
        {

          Data_Pic_Images = data;

          var src = Data_Pic_Images.Articles["SD"][page].Image;

          CarouselInit(Data_Pic_Images.Articles["SD"])

          console.log(src + " __" + page)
            $('#image')[0].src = "https://prakhargyan.s3.ap-south-1.amazonaws.com/" + src;
          callback(src);

        }
        else
        {
          alert('Invalid Data'); 
        }

        
    },
    error: function(data) {
        alert('Invalid Data'); //or whatever
    }
});

}

function postSplitterData(data)
{


console.log(data);


$.ajax({
  type: "POST",
  url: '/splitArticles',
  data: data , 
  success: function(data){
console.log(data)

  }
});


}


var CLIPBOARD = []


function startCanvasEditor(img_src)
{



      $('#image').cropper({
 // preview: '.preview',

viewMode:1,
  crop: function(e) {


  }
});








var KeyState = true;



        $('#saveNewsClip').on('shown.bs.modal', function () {

          var index= CroppedArticles.length;

if(index>0)
$('#previewCroppedArticle')[0].src=  localStorage.getItem(  CroppedArticles[index-1] );


          KeyState = false;
    $('#article_name').focus();
})
                $('#saveNewsClip').on('hidden.bs.modal', function () {

KeyState = true;

})



var _backupImage = clone('#image')



initButtonSetup('#image');


var StackMoves = []
var SpaceRect = []


//Main Data Stack

var MainStack = []


//Cropped Artcle Stack

var CroppedArticles = []



function changeCoverImage(id)
{
console.log('changeCover')


var _image = localStorage.getItem(id)




$('#image').cropper('replace' , _image);
var image = new Image();
image.src =  _image;

_backupImage = clone(image);
StackMoves = []
SpaceRect = []



}


function createArticleCard(name, img , id)
{

var img = document.createElement('img')

img.setAttribute('class','card-img-center');



img.setAttribute('src' ,localStorage.getItem(id) );

img.setAttribute('alt' , name);





var card = document.createElement('div')

card.setAttribute('id' , 'card' )

card.setAttribute('class' , 'card')

var a = document.createElement('a')

a.setAttribute('class' , 'btn btn-primary')



a.setAttribute('onclick' , 'changeCoverImage('+"'" + id +"'"+ ')')


a.innerText = name

card.appendChild(img)
card.appendChild(a)


$('#right-top').append(card)
}


function convertImageToCanvas(image) {
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d").drawImage(image, 0, 0);

  return canvas;
}






function clone(image)
{
 return $(image).clone()[0];
}

function backupImage(image)
{

// var _backupImage = $(image).clone()[0];


var canvas = convertImageToCanvas(_backupImage);
var image= canvas.toDataURL();
$('#image').cropper('replace' , image);
}

function drawImage()
{
  var elem_img =  _backupImage;
var canvas = convertImageToCanvas( elem_img ) ;
var ctx = canvas.getContext("2d");
ctx.globalAlpha = 0.5;
ctx.beginPath();

var MissedExcluded = []

for(i of SpaceRect)
{

if(i.include == true)
{
ctx.fillStyle = 'green';
CropBoxData = i.coordinates;
ctx.rect(CropBoxData.x, CropBoxData.y, CropBoxData.width  ,CropBoxData.height);

}
else if(i.include == false)
{

MissedExcluded.push(i)


}



}

ctx.fill()
var image= canvas.toDataURL();
$('#image').cropper('replace' , image);


}




function blurRect(image , include)
{

var CropBoxData=  $(image).cropper('getData');
if(include == true)
{
SpaceRect.push({ 'coordinates': CropBoxData ,'include' : true});
console.log(SpaceRect);
}
else
{
SpaceRect.push({ 'coordinates': CropBoxData ,'include' : false});
console.log(SpaceRect);
}


var elem_img =  _backupImage;
var canvas = convertImageToCanvas( elem_img ) ;
var ctx = canvas.getContext("2d");
ctx.globalAlpha = 0.5;
ctx.beginPath();

var MissedExcluded = []


for(i of SpaceRect)
{




if(i.include == true)
{
ctx.fillStyle = 'green';
CropBoxData = i.coordinates;
ctx.rect(CropBoxData.x, CropBoxData.y, CropBoxData.width  ,CropBoxData.height);

}
else if(i.include == false)
{

MissedExcluded.push(i)


}



}


//console.log(clipboard);

ctx.fill()
ctx.beginPath();
for(i of MissedExcluded)
{
  ctx.fillStyle = 'red';
CropBoxData = i.coordinates;
ctx.rect(CropBoxData.x, CropBoxData.y, CropBoxData.width  ,CropBoxData.height);

}

ctx.fill()
var image= canvas.toDataURL();
$('#image').cropper('replace' , image);



}


function copyToNewCanvasResetCrop(ctxOld , ctxNew, CropBoxData)
{
var imgData=ctxOld.getImageData( CropBoxData.x, CropBoxData.y, CropBoxData.width  ,CropBoxData.height );
ctxNew.putImageData(imgData , 0 , 0 );



}


function copyToNewCanvas(ctxOld , ctxNew, CropBoxData)
{
var imgData=ctxOld.getImageData( CropBoxData.x, CropBoxData.y, CropBoxData.width  ,CropBoxData.height );
ctxNew.putImageData(imgData , CropBoxData.x , CropBoxData.y);



}




function clearRect(image)
{
var elem_img =  _backupImage;
var canvas = convertImageToCanvas( elem_img ) ;
var ctx = canvas.getContext("2d");
ctx.fillStyle = 'rgba(255, 0, 0, 1)';

var newCanvas=canvas.cloneNode();

canvas.clone

console.log(canvas.width)
console.log(canvas.height)

newCanvas.width = canvas.width
newCanvas.height = canvas.height


var _ctx=newCanvas.getContext("2d");

var _default = true;
var Left = 0;
var Right = 0;
var Top = 0;
var Bottom = 0;
var clipboard = []
for(i of SpaceRect)
{

  CropBoxData = i.coordinates;

  var scale_matrix = 2;

  var __x1 = Math.round(CropBoxData.x*scale_matrix) ;

  var __y1 = Math.round(CropBoxData.y*scale_matrix) 

  var __x2 = Math.round((CropBoxData.x*scale_matrix)+(CropBoxData.width*scale_matrix));

  var __y2 = Math.round( (  CropBoxData.y*scale_matrix)+(CropBoxData.height *scale_matrix ) ) ;





      clipboard.push( (__x1) + "," + (__y1)+":"+(__x2)+','+(__y2) );


if(_default)
{
_default = false;
Left = CropBoxData.x;
Right = CropBoxData.width + Left;
Top = CropBoxData.y;
Bottom = CropBoxData.height + Top

}
else
{

if(Left > CropBoxData.x)
  Left = CropBoxData.x;


if(Right < CropBoxData.width + CropBoxData.x)
  Right = CropBoxData.width + CropBoxData.x;


if(Top > CropBoxData.y)
  Top = CropBoxData.y;


if(Bottom < CropBoxData.height + CropBoxData.y)
  Bottom = CropBoxData.height + CropBoxData.y;



}


copyToNewCanvas(ctx, _ctx , CropBoxData)


}



CLIPBOARD.push(clipboard)

var _CropBoxData = {};
_CropBoxData.x = Left;
_CropBoxData.y = Top;
_CropBoxData.width = Right - Left;
_CropBoxData.height = Bottom - Top;


var _newCanvas = document.createElement('canvas')

_newCanvas.width = _CropBoxData.width;
_newCanvas.height = _CropBoxData.height;

var __ctx=_newCanvas.getContext("2d");



copyToNewCanvasResetCrop(_ctx , __ctx , _CropBoxData );




for(i of SpaceRect)
{
CropBoxData = i.coordinates;




ctx.clearRect(CropBoxData.x, CropBoxData.y, CropBoxData.width  ,CropBoxData.height);


}







var image= canvas.toDataURL();

var TimeStamp = Date.now();

var name_article ='CroppedArticle_'+TimeStamp 

CroppedArticles.push( name_article  );


localStorage.setItem( name_article , _newCanvas.toDataURL() );




createArticleCard('added' ,name_article , name_article);


$('#image').cropper('replace' , image);
var _image = new Image();
_image.src = image;

_backupImage = clone(_image);
StackMoves = []
SpaceRect = []

}

function SaveState()
{


        MainStack.push(SpaceRect);

}




function saveArtcleCropped()
{


        $('#saveNewsClip').modal('show');





// postSplitterData(clipboard)

}



function EnterKey(image) {
  $(document).keypress(function(e) {
    if(e.which == 13 && KeyState) {


  



      SaveState();
      clearRect(image);
console.log(CLIPBOARD);

           // saveArtcleCropped();
      





    }
});
}


function SpaceKey (image) {
  $(document).keypress(function(e) {
    if(e.which == 32 && KeyState) {

 var tmp = $('#image').cropper('getData') 






      blurRect(image , true);
      //Save The cropped Area and Transform And Reset









    }
});
}

function EscapeKey(image)
{

$(document).keyup(function(e) {
     if (e.keyCode == 27 && KeyState) {
      // $(image).cropper('clear')
     $(image).cropper('clear')
    }
});

}

function DeleteKey(image)
{

$(document).keyup(function(e) {
     if (e.keyCode == 46 && KeyState) {
      blurRect(image , false);
    }
});

}


function ControlZ(image)
{
 $(document).keydown(function(e) {
        if (e.keyCode == 90 && e.ctrlKey  && KeyState) {
            Undo();
        }
    });

}
function ControlR(image)
{
 $(document).keydown(function(e) {
        if (e.keyCode == 82 && e.ctrlKey   && KeyState) {
            Redo();
        }
    });

}

function BackspaceKey(image)
{

$(document).keyup(function(e) {
     if (e.keyCode == 8  && KeyState) {
      Undo();

    }
});

}


function initButtonSetup(image)
{

EscapeKey(image);
EnterKey(image);
SpaceKey(image);
// BackspaceKey(image);
ControlZ(image)
ControlR(image)
// DeleteKey(image);
}

function Undo()
{
  var tmp = SpaceRect.pop();
  if(tmp)
  {
    
    StackMoves.push(tmp);
    drawImage();
  }
  
}

function Redo()
{
  var tmp = StackMoves.pop();

  if(tmp)
  {
  SpaceRect.push(tmp);
  drawImage();

  }

}



}





var page = 0;
initPage( startCanvasEditor)



$('#splitIt')[0].setAttribute('onclick' , 'initPublishButton()');