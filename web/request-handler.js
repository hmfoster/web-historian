var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelper = require('./http-helpers.js');
var fs = require('fs');

var sendResponse = function(res, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, httpHelper.headers);
};

exports.handleRequest = function (req, res) {

  if (req.method === 'GET'){
    var url;
    if (req.url === '/') {
      url = archive.paths.siteAssets + '/index.html';
    } else {
      url = archive.paths.archivedSites + req.url;
    }
    //chek if url exists, if not serve 404
    fs.exists(url, function(exists){
      if (exists) {
        sendResponse(res);
        httpHelper.serveAssets(res, url, res.end);
      } else {
        sendResponse(res, 404);
        res.end();
      }
    });

    // try{
    //   console.log("TRY BLOCK");
    //   sendResponse(res);
    //   httpHelper.serveAssets(res, url, res.end);
    // } catch(err){
    //   console.log('ERROR!!!!!');
    // }
    //WHY DOESN"T THIS WORK? The catch doesn't happen
  }
  else if (req.method === 'POST'){
    sendResponse(res, 302);
    var dataString = '';

    req.on('data',function(chunk){
      dataString +=chunk.toString();
    });

    req.on('end',function(){
      archive.addUrlToList(dataString);
      res.end();
    });
  }

  // default
  res.end(archive.paths.list);
};


// fs.exists('/etc/passwd', function (exists) {
//   util.debug(exists ? "it's there" : "no passwd!");
// });

// try {
  // if...
  // serveAssets -> throws error, goes to catch
// }
// catch (ex) {
  // error logic exists -> handling 404
  // console.error("outer", ex.message);
// }
