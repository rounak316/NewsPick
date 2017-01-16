var mongoose = require('mongoose');
mongoose.connect('mongodb://54.202.250.147/test');
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

var pdf_find_by_folder = function(res)
{

var pdf = new PDF();


PDF.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
res.send(users)
});

}

exports.pdf_save = pdf_save;

exports.pdf_find_by_folder = pdf_find_by_folder;
