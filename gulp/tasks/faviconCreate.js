const realFavicon = require('gulp-real-favicon');
const FAVICON_DATA_FILE = 'favicon.json';

module.exports = function createFavicon(done) {
  realFavicon.generateFavicon({
    masterPicture: 'app/assets/images/favicon/favicon.png',
    dest: 'build/images/favicon',
    iconsPath: 'images/favicon/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '0%',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        },
        appName: 'SkyFix Dev'
      },
      desktopBrowser: {
        design: 'background',
        backgroundColor: '#ffffff',
        backgroundRadius: 1,
        imageScale: 1
      },
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#da532c',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        },
        appName: 'SkyFix Dev'
      },
      androidChrome: {
        pictureAspect: 'backgroundAndMargin',
        margin: '0%',
        backgroundColor: '#ffffff',
        themeColor: '#ffffff',
        manifest: {
          name: 'SkyFixDev',
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      },
      safariPinnedTab: {
        pictureAspect: 'blackAndWhite',
        threshold: 65.625,
        themeColor: '#ed0000'
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
      readmeFile: false,
      htmlCodeFile: false,
      usePathAsIs: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function () {
    done();
  });
};



