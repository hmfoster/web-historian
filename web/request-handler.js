var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelper = require('./http-helpers.js');
var fs = require('fs');

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
  else if (req.method === 'POST'){
    //set event listener for on data
    var dataString = '';
    req.on('data',function(chunk){
      //build up data string with chunks
      dataString +=chunk.toString();
    });
    //update statusCode to 302
    //statusCode = 302;
    //write header as before
    res.writeHead(302, httpHelper.headers);
    //set event listener for on end
    req.on('end',function(){
      dataString = dataString.split('=')[1]+"\n";
      //write data to file --> use appendFile, passing in data
      fs.appendFile(archive.paths.list, dataString, function(err){
        if (err){
          throw err;
        }
      });
      res.end();
    });
      //end response --> as a callback to append???
    }
  res.end(archive.paths.list);
};

// add to archive-helpers
// fs.appendFile('message.txt', 'data to append', function (err) {
//   if (err) throw err;
//   console.log('The "data to append" was appended to file!');
// });