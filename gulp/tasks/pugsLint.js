const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const pugLint = require('gulp-pug-linter');
const myReporter = (errors) => {
  errors.map(error => console.error(error.message));
};

module.exports = function pugLinter() {
  return gulp.src('app/**/*.pug')
  .pipe(plumber({
    errorHandler: notify.onError(function (err) {
      return {
        title: 'Pug Linter',
        message: err.message
      };
    })
  }))
  .pipe(pugLint({
    failAfterError: true,
    reporter: myReporter
  }));
};
