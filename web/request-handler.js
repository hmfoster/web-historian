var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelper = require('./http-helpers.js');

//make sendResponse helper; includes setting statusCode and headers

exports.handleRequest = function (req, res) {

  if (req.method === 'GET'){
    var url;
    if (req.url === '/') {
      url = archive.paths.siteAssets + '/index.html';
    } else {
      url = archive.paths.archivedSites + req.url;
    }

    var statusCode = 200;
    res.writeHead(statusCode, httpHelper.headers);
    httpHelper.serveAssets(res, url, res.end);
  }
  //check for POST req.method
    //set event listener for on data
      //build up data string with chunks 
    //update statusCode to 302
    //write header as before
    //set event listener for on end
      //write data to file
      //end response  
  res.end(archive.paths.list);
};

