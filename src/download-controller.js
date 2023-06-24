const fs = require("fs"),
  request = require("request"),
  path = require("path");

const download = function (uri, callback) {
  request.head(uri, function (err, res, body) {
    const postfix = /png/.test(uri) ? "png" : "jpg";
    request({
      uri,
      headers: {
        Referer: "https://meirentu.cc/",
      },
    })
      .pipe(
        fs.createWriteStream(
          path.join("/Users/zhaizhe/Downloads", `${Date.now()}.${postfix}`)
        )
      )
      .on("close", callback);
  });
};

module.exports = {
  download,
};

// download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//   console.log('done');
// });
