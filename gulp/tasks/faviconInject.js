const gulp = require('gulp');
const realFavicon = require('gulp-real-favicon');
const fs = require('fs');
const FAVICON_DATA_FILE = 'favicon.json';

module.exports = function injectFavicon() {
  return gulp.src(['build/**/*.html'])
  .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
  .pipe(gulp.dest('build/'));
};
