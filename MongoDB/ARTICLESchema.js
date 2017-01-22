var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var SubArticleSchema = require('./SubArticleSchema.js')

var ArticleSchema = new Schema({

Quality:{type:String} ,
Page:{type:Number} ,
Image:{ type:String },
SplitterData: {}

})




exports.ArticleSchema = ArticleSchema;
