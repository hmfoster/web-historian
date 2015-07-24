var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelper = require('./http-helpers.js');
var fs = require('fs');

var sendResponse = function(res, req, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, httpHelper.headers(req.url));
};

var actions = {
  'GET': function(req, res){
    if (req.url === '/') {
      url = archive.paths.siteAssets + '/index.html';
    } else if (req.url === '/styles.css'){
      url = archive.paths.siteAssets + '/styles.css';

    } else {
      url = archive.paths.archivedSites + req.url;
    }
    //check if url exists, if not serve 404
    fs.exists(url, function(exists){
      if (exists){
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

  }, 

  'POST': function(req, res){
    var dataString = '';

    req.on('data',function(chunk){
      dataString +=chunk.toString();
    });

    req.on('end',function(){
      sendResponse(res, req, 302);
      var fileName = archive.createFileNameForUrl(dataString);
      url = archive.paths.archivedSites + fileName;

      fs.exists(url, function(exists){
        if (exists) {
          httpHelper.serveAssets(res, url, function(data){
            res.end(data);
          });
        }
        else {
          // use helper isUrlInList to determine if need to add to list
          var rawURL = dataString.split('=')[1];
          console.log(archive.isUrlInList(rawURL));
          if (!archive.isUrlInList(rawURL)){
            archive.addUrlToList(rawURL);
          }
          url = archive.paths.siteAssets+"/loading.html";
          httpHelper.serveAssets(res, url, function(data){
            res.end(data);
          });
        }
      });
    });
  }
};
exports.handleRequest = function (req, res) {
  var url;
  var action = actions[req.method];
  if (action){
    action(req, res);
  }
};
