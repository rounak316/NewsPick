var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var ArticleSchema = new Schema({

Quality:{type:String} ,
Page:{type:Number} ,
Image:{ type:String }

})




exports.ArticleSchema = ArticleSchema;
