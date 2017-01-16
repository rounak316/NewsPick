var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var PDF = new Schema({

        Folder: { type: Number, default: 00000000 } ,
	
	name: { type: String, default: 'guitarist' } ,
	date: { type: Date, default: Date.now() } ,
	page_title: { type: String, default: 'guitarist' } ,
	page_no: { type: String, default: 'guitarist' } ,
	uploadedBy: { type: String, default: 'guitarist' } ,
    status: { type: Number, default: 0 } ,

	Key: { type: String, default: null } ,
	Location: { type: String, default: null } ,
	Bucket: { type: String, default: null } 

})

PDF.pre("save", true,function(next, done) {
    var self = this;

    mongoose.models['PDF'].findOne({name : self.name + 'nikalo',Key : self.Key,Location : self.Location,Bucket : self.Bucket  },function(err, results) {
        if(err) {
            done(err);
        } else if(results) { //there was a result found, so the email address exists
            self.invalidate("email","email must be unique");
            done(new Error("email must be unique"));
        } else {
            done();
        }
    });
    next();
});


exports.PDF = PDF;
