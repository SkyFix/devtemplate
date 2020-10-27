const realFavicon = require('gulp-real-favicon');
const fs = require('fs');
const FAVICON_DATA_FILE = 'favicon.json';
module.exports = function checkForFaviconUpdate(done) {
  const currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    } else done()
  });
};
