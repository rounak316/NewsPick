var mongoose = require('mongoose');
mongoose.connect('mongodb://ec2-54-202-250-147.us-west-2.compute.amazonaws.com/test');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});