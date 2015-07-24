var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(this.paths.list, function(err, data){
    if (err){
      throw err;
    }
    data = data.toString().split('\n');
    callback(data);
  });
};

exports.isUrlInList = function(){
};

exports.addUrlToList = function(dataString){
  dataString = dataString.split('=')[1]+"\n";

  //write data to file --> use appendFile, passing in data
  fs.appendFile(this.paths.list, dataString, function(err){
    if (err){
      throw err;
    }
  });
};

exports.isURLArchived = function(url){
  fs.exists(url, function(exists){
    return exists;
  });
};

exports.downloadUrls = function(url){
  var newFilePath = this.paths.archivedSites + this.createFileNameForUrl(url);
  httpRequest.get(url, newFilePath, function(err, res){
    if (err) { console.log(err); }
  });
};

exports.createFileNameForUrl = function(url) {
  var fileName = url.split('.').splice(1).join('_');
  return '/' + fileName;
};




