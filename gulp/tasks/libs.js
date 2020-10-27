const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const argv = require('yargs').argv;
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const merge = require('merge-stream');

const libsPaths = ['node_modules/jquery/dist/jquery.js'];
const libsExceptionsPaths = ['node_modules/html5shiv/dist/html5shiv.min.js'];

module.exports = function libs() {
  const firstPath =  gulp.src(libsPaths)
  .pipe(plumber({
    errorHandler: notify.onError(function (err) {
      return {
        title: 'JS-libs',
        message: err.message
      };
    })
  }))
  .pipe(babel())
  .pipe(gulpIf(argv.prod, terser({
    format: {
      comments: false
    },
    compress: {
      dead_code: true
    }
  })))
  .pipe(concat('libs.js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/js/libs'));

  const secondPath = gulp.src(libsExceptionsPaths)
  .pipe(plumber({
    errorHandler: notify.onError(function (err) {
      return {
        title: 'JS-libs',
        message: err.message
      };
    })
  }))
  .pipe(babel())
  .pipe(gulpIf(argv.prod, terser({
    format: {
      comments: false
    },
    compress: {
      dead_code: true
    }
  })))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/js/libs'));

  return merge(firstPath, secondPath);
};
