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


var articles = function(res , param)
{



var pdf = new PDF();


PDF.find(param, function(err, pdf) {
  if (err) 
    res.send('error')
else
  // object of all the users
res.send(pdf)
});




}



exports.pdf_save = pdf_save;

exports.pdf_find_by_folder = pdf_find_by_folder;


exports.pdf_find_articles = pdf_find_articles


exports.articles = articles
