var walkSync = function(callback ,  dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(callback , dir + '/' + file, filelist);
    }
    else {
      filelist.push(dir+ '/'+ file);

    }
  });


  callback(filelist);
  return filelist;
};




exports.readAllFile = walkSync

