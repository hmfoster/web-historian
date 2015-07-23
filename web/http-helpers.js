var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var mimeTypes = {
 '.js' : 'text/javascript',
 '.html': 'text/html',
 '.css' : 'text/css'
};

exports.headers = function(lookup){
  
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10, // Seconds.
    'Content-Type':  mimeTypes[path.extname(lookup)]
  };
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)

  //use fs to read from our assetSource and stringify
  fs.readFile(asset, function(err, data){
    if (err) {
      throw err;
    }

    callback(data.toString());
  });
};



// As you progress, keep thinking about what helper functions you can put here!
