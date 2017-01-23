var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 
mongoose.connect('mongodb://54.202.250.147/test', {
  server: {
    socketOptions: {
      socketTimeoutMS: 0,
      connectTimeoutMS: 0
    }
  }
});



var PDFSchema = require('./PDFSchema.js').PDF







var PDF = mongoose.model('PDF', PDFSchema);





var pdf_save = function(param)
{

var pdf = new PDF(param);




pdf.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});



}

var pdf_find_by_folder = function(res , folder)
{



var pdf = new PDF();


PDF.find({Folder:folder}, function(err, users) {
  if (err) 
  	res.send([])
else
  // object of all the users
res.send(users)
});




}


var pdf_find_articles = function(res , _id)
{



var pdf = new PDF();
if(ObjectId.isValid(_id))
_id = new ObjectId(_id);
else

{
  throw new Error();

}


PDF.findOne({_id: _id}  , '-_id Articles', function(err, articles) {
  if (err || !articles) 
    res.send({})
else
  // object of all the users
res.send(articles.Articles)
});




}


function findArticleForSplit(res , param , article) 
{

try
{

  var splitter_data = param.splitter_data;
var pdf_id = param.pdf_id;
var page_no = param.page_no;
var url = param.url
var quality = param.quality



var Articles = article.Articles[quality];

if(!Articles)
res.send(Articles)

for(var Article of Articles)
{

if(Article._id == pdf_id)
{

res.send(Article)
return
}


}

res.send('{}' + article)

}
catch(ex)
{
throw new Error();

}


}


var splitArticles = function(res , param)
{

var _id = param._id;



var pdf = new PDF();


PDF.findOne(  {_id:_id }, function(err, article) {
  if (err || !article)  
   res.send('{}')
else{
  // object of all the users

console.log(article)
try
{
findArticleForSplit(res , param , article)
}
catch(ex)
{
throw new Error();

}


}




});




}



exports.pdf_save = pdf_save;

exports.pdf_find_by_folder = pdf_find_by_folder;


exports.pdf_find_articles = pdf_find_articles


exports.splitArticles = splitArticles
