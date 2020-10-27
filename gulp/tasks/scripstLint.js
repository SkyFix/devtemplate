const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const eslint = require('gulp-eslint');

module.exports = function scriptLinter() {
  return gulp.src(['app/**/*.js', '!app/vendors', '!../node_modules'])
  .pipe(plumber({
    errorHandler: notify.onError(function (err) {
      return {
        title: 'JS Linter',
        message: err.message
      };
    })
  }))
  .pipe(eslint());
};
