var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var _ = require('underscore');

// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

// reads list of urls (helper function)
  // for each url
    // check if file exists
      // if so, dont do anything
      // else, call downloadurls helper (which may call http-get library)
        // downloads and saves to sites/

archive.readListOfUrls(function(urls){
  _.each(urls, function(url){
    if (!archive.isURLArchived(url) || url === '') {
      archive.downloadUrls(url);
    }
  });
});