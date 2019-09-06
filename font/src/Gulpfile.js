var async = require('async');
var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var webserver = require('gulp-webserver');
var runTimestamp = Math.round(Date.now()/1000);
// var iconfontCss = require('gulp-iconfont-css');

gulp.task('default', function(done){
  var iconStream = gulp.src(['../build/icons/**/*.svg'])
    .pipe(iconfont({
      fontName: 'myfont',
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      timestamp: runTimestamp,
    }));

  async.parallel([
    function handleGlyphs (cb) {
      iconStream.on('glyphs', function(glyphs, options) {
        gulp.src('../build/icons/iconfont.css')
          .pipe(consolidate('lodash', {
            glyphs: glyphs,
            fontName: 'myfont',
            fontPath: '../iconfont/',
            className: 's'
          }))
          .pipe(gulp.dest('../assets/css/'))
          .on('finish', cb);
      });
    },
    function handleFonts (cb) {
      iconStream
        .pipe(gulp.dest('../assets/iconfont/'))
        .on('finish', cb);
    },
    function server(cb) {
      gulp.src('../assets')
      .pipe(webserver({
          livereload: true,
          port: 4444,
          open: true
      }))
      .on('finish', cb);
    }
  ], done);
});















// gulp.task('default', function(){
//   return gulp.src(['../build/icons/**/*.svg'])
//     .pipe(iconfont({
//       fontName: 'myfont', // required
//       prependUnicode: true, // recommended option
//       formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
//       timestamp: runTimestamp, // recommended to get consistent builds when watching files
//     }))
//       .on('glyphs', function(glyphs, options) {
//         // CSS templating, e.g.
//         console.log(glyphs, options);
//       })
//     .pipe(gulp.dest('../assets/iconfont/'));
// });

// var fontName = 'Icons';
// gulp.task('css', function(){
//   gulp.src(['../build/icons/**/*.svg'])
//     .pipe(iconfontCss({
//       fontName: fontName,
//       path: '../assets/css/iconfont.css',
//       targetPath: '../assets/css/iconfont.css',
//       fontPath: '../assets/iconfont/'
//     }))
//     .pipe(iconfont({
//       fontName: fontName
//      }))
//     .pipe(gulp.dest('../assets/css/'));
// });