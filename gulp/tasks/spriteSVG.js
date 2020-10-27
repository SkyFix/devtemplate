const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const svgMin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const buffer = require('vinyl-buffer');

// Делаем SVG спрайт

module.exports = function spriteSVG() {
  return gulp.src('app/assets/images/sprites/decorative/icons/svg/**/*.svg')
  .pipe(buffer())
  .pipe(svgMin({
    js2svg: {
      pretty: true,
    },
  }))
  .pipe(cheerio({
    run: function ($) {
      $('[fill]').removeAttr('fill');
      $('[stroke]').removeAttr('stroke');
      $('[style]').removeAttr('style');
    },
    parserOptions: {xmlMode: true},
  }))
  .pipe(replace('&gt;', '>'))
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: 'sprite.svg',
      },
      render: {
        scss: {
          dest: '../app/vendors/generated/_sprite.scss'
        },
      },
    },
  }))
  .pipe(gulp.dest('build/images/sprites/svg'));
};
