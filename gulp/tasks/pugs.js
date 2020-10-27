'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const beautify = require('gulp-beautify');
const plumber = require('gulp-plumber');
const htmlValidator = require('gulp-w3c-html-validator');
const bemValidator = require('gulp-html-bem-validator');
const notify = require('gulp-notify');
const fs = require("fs");

module.exports = function pugToHtml() {
  return gulp.src('app/pages/layout/*.pug')
  .pipe(plumber({
    errorHandler: notify.onError(function (err) {
      return {
        title: 'Pug',
        message: err.message
      };
    })
  }))
  .pipe(pug({
    locals: {
      menu: JSON.parse(fs.readFileSync('app/assets/data/menu.json', 'utf8')),
      breadcrumb: JSON.parse(fs.readFileSync('app/assets/data/breadcrumb.json', 'utf8')),
      content: JSON.parse(fs.readFileSync('app/assets/data/content.json', 'utf8'))
    }
  }))
  .pipe(htmlValidator())
  .pipe(bemValidator())
  .pipe(beautify.html({indent_size: 2}))
  .pipe(gulp.dest('build'));
};
