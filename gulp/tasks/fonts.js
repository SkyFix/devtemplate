const gulp = require('gulp');
// Копируем все шрифты из папки dev в build
module.exports = function fonts() {
  return gulp.src(['app/assets/fonts/**/*.*'])
  .pipe(gulp.dest('build/fonts'));
};
