const gulp = require('gulp');
const buffer = require('vinyl-buffer');
const imageMin = require('gulp-imagemin');
const merge = require('merge-stream');
const spriteSmith = require('gulp.spritesmith');

module.exports = function spritePNG() {
  // Генерируем спрайт
  const spriteData = gulp.src('app/assets/images/decorative/icons/png/**/*.png')
  .pipe(spriteSmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprites/png/sprite.png',
    cssName: '_sprite.scss',
    padding: 5,
    cssVarMap: function (sprite) {
      sprite.name = 'icon-' + sprite.name;
    },
  }));

  // Оптимизируем спрайт
  const imgStream = spriteData.img
  .pipe(buffer())
  .pipe(imageMin())
  .pipe(gulp.dest('build/images/sprites/png'));

  // Собираем SCSS
  const cssStream = spriteData.css
  .pipe(gulp.dest('app/utils/'));

  return merge(imgStream, cssStream);
};
