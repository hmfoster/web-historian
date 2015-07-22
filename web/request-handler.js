var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelper = require('./http-helpers.js');

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

  res.end(archive.paths.list);
};

