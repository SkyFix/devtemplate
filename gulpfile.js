'use strict';

const gulp = require('gulp');// Подключение Gulp
const pugToHtml = require('./gulp/tasks/pugs');//Таск конвертирования файлов Pug в  Html
const pugsLinter = require('./gulp/tasks/pugsLint');//Таск линтирования pug файлов
const serve = require('./gulp/tasks/serve');//Таск поднимает сервер, и запускает watchers при создании или изменении файлов
const clean = require('./gulp/tasks/clean');//Таск удаление папки ./build и содержимого
const styles = require('./gulp/tasks/styles');//Таск конвентирования файлов Scss в Css
const styleLinter = require('./gulp/tasks/styleLint');//Таск конвентирования файлов Scss в Css
const smartGrid = require('./gulp/tasks/smart-grid');//Таск конвентирующий сетку
const scriptsLinter = require('./gulp/tasks/scripstLint');//Таск линтирования js файлов
const scripts = require('./gulp/tasks/scripts');//Таск работы со скриптами
const libs = require('./gulp/tasks/libs');//Таск работы со скриптами
const fonts = require('./gulp/tasks/fonts');//Такс переноса шрифтов при работе с проектом
const images = require('./gulp/tasks/images');//Такс переноса и обработки изображений
const spritePNG = require('./gulp/tasks/spritePNG');//Такс создания спрайта PNG и переноса
const spriteSVG = require('./gulp/tasks/spriteSVG');//Такс создания спрайта SVG и переноса
const faviconCreateFunc = require('./gulp/tasks/faviconCreate');//Таск создания фавикона для проекта из картинки
const faviconInjectInHtml = require('./gulp/tasks/faviconInject');//Таск подключения файлов фавикона ко всем картинкам
const faviconUpdateFunc = require('./gulp/tasks/faviconUpdate');//Таск обновления параметров плагина favicon

const dev = gulp.parallel(pugToHtml,
  pugsLinter,
  styles,
  styleLinter,
  scripts,
  scriptsLinter,
  libs,
  fonts,
  images,
  spritePNG,
  spriteSVG);

exports.favicon = gulp.series(faviconCreateFunc, faviconInjectInHtml, faviconUpdateFunc);
exports.eslint = gulp.series(scriptsLinter);
exports.stylelint = gulp.series(styleLinter);
exports.grid = gulp.series(smartGrid);

exports.default = gulp.series(
  clean,
  dev,
  serve
);
