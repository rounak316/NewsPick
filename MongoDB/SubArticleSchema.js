var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var SubArticleSchema = new Schema({

Image:{ type:String },


Coorinates:{type: [String]}

})




exports.SubArticleSchema = SubArticleSchema;
