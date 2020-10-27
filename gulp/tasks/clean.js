const del = require('del');

// Полностью удаляем папку build

module.exports = function clean(cb) {
  return del('build').then(() => {
    cb();
  });
};
