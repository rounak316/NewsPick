var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var SubArticleSchema = new Schema({

pdf_id:{type: Schema.Types.ObjectId } ,


article_id:{type: Schema.Types.ObjectId } ,


page_no:{type:Number} ,


Location:{type:String} ,


splitter_data:{type:String} ,

quality:{type:String} ,

status: {type:Number , default:0} , 


SubArticlesImages : {type:[]}


})




exports.SubArticleSchema = SubArticleSchema;
