var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
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


exports.pdf_save = pdf_save;