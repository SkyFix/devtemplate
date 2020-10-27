const gulp = require('gulp');
const pugToHtml = require('./pugs');
const pugLinter = require('./pugsLint');
const styles = require('./styles');
const styleLinter = require('./styleLint');

const scripts = require('./scripts');
const scriptsLint = require('./scripstLint');

const fonts = require('./fonts');
const images = require('./images');
const svgSprite = require('./spriteSVG');
const pngSprite = require('./spritePNG');

// Запуск сервера и вотчинг
const server = require('browser-sync').create();
module.exports = function serve(cb) {
  server.init({
    server: 'build',
    notify: true,
    open: true,
    cors: true,
  });

  gulp.watch(['app/pages/layout/**/*.pug', 'app/modules/**/*.pug', 'app/utils/**/*.pug'], gulp.series(pugToHtml, pugLinter));
  gulp.watch(['app/pages/styles/*.scss', 'app/modules/**/*.scss', 'app/utils/**/*.scss'], gulp.series(styles, styleLinter)).on('change', server.reload);
  gulp.watch(['app/pages/scripts/**/*.js', 'app/modules/**/*.js'], gulp.series(scripts, scriptsLint)).on('change', server.reload);
  gulp.watch('app/assets/data/**/*.json', gulp.series(pugToHtml)).on('change', server.reload);
  gulp.watch('app/assets/fonts/*/*.*', gulp.series(fonts)).on('change', server.reload);

  gulp.watch('app/assets/images/*/*.{gif,png,jpg,svg,webp}', gulp.series(images)).on('change', server.reload);
  gulp.watch('app/assets/images/decorative/icons/svg/*.svg', gulp.series(svgSprite)).on('change', server.reload);
  gulp.watch('app/assets/images/decorative/icons/png/*.png', gulp.series(pngSprite)).on('change', server.reload);

  gulp.watch('build/*.html').on('change', server.reload);
  return cb();
};
