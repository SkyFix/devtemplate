const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const styleLint = require('gulp-stylelint');

module.exports = function styleLinter() {
  return gulp.src(['app/**/*.scss', '!app/vendors/**/*.scss', '!app/utils/_sprite.scss'])
  .pipe(plumber({
    errorHandler: notify.onError(function (err) {
      return {
        title: 'Scss Linter',
        message: err.message
      };
    })
  }))
  .pipe(styleLint({
    debug: true,
    failAfterError: true,
    reporters: [
      {formatter: 'string', console: true}
    ]
  }));
};
