var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var PDF = new Schema({
	
	name: { type: String, default: 'guitarist' } ,
	date: { type: Date, default: Date.now() } ,
	page_title: { type: String, default: 'guitarist' } ,
	page_no: { type: String, default: 'guitarist' } ,
	uploadedBy: { type: String, default: 'guitarist' } 

})
