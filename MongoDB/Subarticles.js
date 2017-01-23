var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var SubArticleSchema = new Schema({

pdf_id:{type:String} ,


article_id:{type:String} ,


page_no:{type:Number} ,


Location:{type:String} ,


splitter_data:{type:String} ,

quality:{type:String} 



})




exports.SubArticleSchema = SubArticleSchema;
