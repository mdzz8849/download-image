const fs = require('fs'),
    request = require('request'),
    path = require('path');

const download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){

    request(uri).pipe(fs.createWriteStream(path.join('/Users/zhaizhe/Downloads', filename))).on('close', callback);
  });
};

module.exports = {
  download
}

// download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//   console.log('done');
// });