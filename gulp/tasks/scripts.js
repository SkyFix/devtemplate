const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const argv = require('yargs').argv;
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const merge = require('merge-stream');

module.exports = function scripts() {
  const customFilesPath = gulp.src(['app/modules/**/*.js'])
  .pipe(plumber({
    errorHandler: notify.onError(function (err) {
      return {
        title: 'JS',
        message: err.message
      };
    })
  }))
  .pipe(gulpIf(!argv.prod, sourcemaps.init()))
  .pipe(babel())
  .pipe(gulpIf(argv.prod, terser({
    format: {
      comments: false
    }
  })))
  .pipe(concat('app.js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulpIf(!argv.prod, sourcemaps.write('./maps')))
  .pipe(gulp.dest('build/js'));

  const exceptionsPath = gulp.src(['app/pages/scripts/**/*.js'])
  .pipe(plumber({
    errorHandler: notify.onError(function (err) {
      return {
        title: 'JS',
        message: err.message
      };
    })
  }))
  .pipe(gulpIf(!argv.prod, sourcemaps.init()))
  .pipe(babel())
  .pipe(gulpIf(argv.prod, terser({
    format: {
      comments: false
    }
  })))
  .pipe(gulpIf(!argv.prod, sourcemaps.write('./maps')))
  .pipe(gulp.dest('build/js'));

  return merge(customFilesPath, exceptionsPath);
};
