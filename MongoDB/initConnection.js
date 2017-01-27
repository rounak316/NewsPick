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



var SubArticleSchema = require('./Subarticles.js').SubArticleSchema



var PDF = mongoose.model('PDF', PDFSchema);

var SubArticle =  mongoose.model('ARTICLES', SubArticleSchema);



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


PDF.findOne({_id: _id}  , function(err, articles) {
  if (err || !articles) 
    res.send({})
else
  // object of all the users
res.send(articles)
});




}



function findEpaperArticles(folder, succeess , failure )
{

  SubArticle


  SubArticle.find({Folder: folder , _id : new ObjectId("588bab335f0b245c32f5ba45")  }  , function(err, articles) {
  if (err || !articles) 
   failure(err)
else
  // object of all the users
succeess(articles)
});


}


function findArticleForSplit(res , param , article) 
{

 console.log('iintt' + param + article)

try
{

  var _splitter_data = param.splitter_data;
var pdf_id = article._id;
var article_id = param.article_id;

var url = param.url
var quality = param.quality
var Location = param.Location

var Folder = article.Folder

var splitter_data =""
for(var a of _splitter_data)
{

for(var b of a)
{


splitter_data+=b+"|"

}

splitter_data=splitter_data.slice( 0 , splitter_data.length-1)

splitter_data+="_"


}
splitter_data=splitter_data.slice( 0 , splitter_data.length-1)






var Articles = article.Articles[quality];

if(!Articles)
res.send(Articles)

for(var Article of Articles)
{


if(Article._id == article_id)
{

var page_no = Article.page_no;

var save_sub_article = { pdf_id: new ObjectId(pdf_id), article_id: new ObjectId( article_id) , page_no:page_no , Location: Location , splitter_data:splitter_data , quality: quality , Folder:Folder }; 



var sub_article = new SubArticle(save_sub_article);




sub_article.save(function (err) {
  if (err) {
    console.log('error' , err);
  } else {
    console.log('Saved SubArticle');
  }
});




res.send(Article)
return
}


}

res.send('{}' )

}
catch(ex)
{
throw new Error();

}


}


var splitArticles = function(res , param)
{

var pdf_id = param.pdf_id;



var pdf = new PDF();


PDF.findOne(  {_id:pdf_id }, function(err, article) {
  if (err || !article)  
   res.send('{}')
else{
  // object of all the users


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

exports.findEpaperArticles = findEpaperArticles