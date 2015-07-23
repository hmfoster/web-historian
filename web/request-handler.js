var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelper = require('./http-helpers.js');
var fs = require('fs');

var sendResponse = function(res, req, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, httpHelper.headers(req.url));
};

exports.handleRequest = function (req, res) {

  if (req.method === 'GET'){
    var url;
    if (req.url === '/') {
      url = archive.paths.siteAssets + '/index.html';
    } else if (req.url === '/styles.css'){
      url = archive.paths.siteAssets + '/styles.css';

    }
    else {
      url = archive.paths.archivedSites + req.url;
    }
    //chek if url exists, if not serve 404
    fs.exists(url, function(exists){
      if (exists) {
        sendResponse(res, req);
        httpHelper.serveAssets(res, url, function(data){
          res.end(data);
        });
      }

      else {
        sendResponse(res, req, 404);
        res.end('404: not allowed');
      }
    });
  }
  else if (req.method === 'POST'){
    var dataString = '';

    req.on('data',function(chunk){
      dataString +=chunk.toString();
    });

    req.on('end',function(){
      sendResponse(res, req, 302);
      url = archive.paths.archivedSites + dataString;
      fs.exists(url, function(exists){
        if (exists) {
          httpHelper.serveAssets(res, url, function(data){
            res.end(data);
          });
        }
        else {
          archive.addUrlToList(dataString);
          url = archive.paths.siteAssets+"/loading.html";
          httpHelper.serveAssets(res, url, function(data){
            res.end(data);
          });
        }
      });
    });
  }
};
