var request = require('request');


// request.post('http://service.com/upload', {form:{key:'value'}})

var access_token="EAAaC2JPzeVoBAPdl99OLN3zAC5WLTKP4Kqtm9EQNicgZBnzmYhaaDSNMN39iW6ceXeDdi0BBpHCGidRy1OrVUAssKXAuYjafgIVA5Px5RBijheYvDg8v0VjNvWY5VDmOJI2ug061QMBtWLEDX3QmKjRjlGJNWP70ZBZBYCWuwZDZD"


access_token="EAAaC2JPzeVoBAHnWclkDk3zWvpmVKs0wtViKQVPZCJ2NNqSaqcEdrrmzP43HAhuNkcNbvVeDJeGvpZB82lu4h8cklcvgfDlMHIaEOib6ZA8Fw1GMZAY6tkNVdJMg2Pmx7u9uhs7fhOsxbMzZBEI9zR6ZAtl2wToKYzQvIu4r6XrAZDZD"


// access_token = "EAAaC2JPzeVoBAK8AMNrKHQk0z89wlrZCPZCw1m6CVwhKX2iruRT99zeeIz5K3QZCZCGWa1DOu4Ha4ha8xBoxImEtO7gJUs5nZBeXOJXimQCIHxAiWWZAxzeGftOX97SqzxFxe6nncqV3NZA6S2ZAdnFy&"


body ={

"access_token":access_token
,

"caption":"teshoto%20upload"

,

"url": "https://prakhargyan.s3.ap-south-1.amazonaws.com/588871169e027565e74e0a21/588871249e027565e74e0a23/FD/Articles//draw_rect0.jpg" ,

"privacy" :{ value:"SELF" }

// "published":false

}



token_generator = "https://graph.facebook.com/oauth/access_token?client_id=1832716567017818&client_secret=10e22b40d8c482665c94264bdbeb3b0e&grant_type=fb_exchange_token&fb_exchange_token="+access_token

// request.get( token_generator, function(err,httpResponse,body){
// console.log(err)
// console.log(body)

//  /* ... */ })





request.post({url:'https://graph.facebook.com/v2.4/me/photos', form: body }, function(err,httpResponse,body){

console.log(body)
 /* ... */ })