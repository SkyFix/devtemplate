const gulp = require('gulp');
const buffer = require('vinyl-buffer');
const imageMin = require('gulp-imagemin');

// Минификация и оптимизация изображений

module.exports = function imageMinify() {
  return gulp.src(
    ['app/assets/images/content/*.{gif,png,jpg,svg,webp}'],
  )
  .pipe(buffer())
  .pipe(imageMin([
    imageMin.gifsicle({interlaced: true}),
    imageMin.mozjpeg({
      quality: 75,
      progressive: true,
    }),
    imageMin.optipng({optimizationLevel: 5}),
    imageMin.svgo({
      plugins: [
        {removeViewBox: true},
        {cleanupIDs: true},
      ],
    }),
  ]))
  .pipe(gulp.dest('build/images/content'));
};
