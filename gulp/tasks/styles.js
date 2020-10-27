const gulp = require('gulp');
const plumber = require('gulp-plumber');
const scss = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoPreFixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const argv = require('yargs').argv;
const gulpIf = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
const notify = require('gulp-notify');


scss.compiler = require('node-sass');


module.exports = function styles() {
  return gulp.src('app/pages/styles/**/*.scss')
  .pipe(plumber({
    errorHandler: notify.onError(function (err) {
      return {
        title: 'Scss',
        message: err.message
      };
    })
  }))
  .pipe(gulpIf(!argv.prod, sourcemaps.init()))
  .pipe(scss())
  .pipe(autoPreFixer({
    overrideBrowserslist: ['last 4 version'],
    cascade: false,
  }))
  .pipe(gcmq())
  .pipe(gulpIf(argv.prod, cleanCSS({
    debug: true,
    compatibility: '*',
  }, details => {
    console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`);
  })))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulpIf(!argv.prod, sourcemaps.write('./maps')))
  .pipe(gulp.dest('build/css'));
};
