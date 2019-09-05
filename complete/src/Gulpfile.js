const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const compass = require( 'gulp-for-compass' );
const webserver = require('gulp-webserver');

function javascript(cb) {

	return gulp.src('../build/js/**/*.js')
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('../course/assets/min/'));

  cb();
}


function css(cb) {

  return gulp.src('../build/sass/**/*.scss')
  .pipe(compass({
      sassDir: '../build/sass',
      cssDir: '../course/assets/css',
      force: true
  }));

  cb();
}

function server(cb) {

  return gulp.src('../course')
  .pipe(webserver({
      livereload: true,
      port: 4444,
      open: true
  }));

  cb();
}

exports.default = gulp.series(
  server,
  function() {
	gulp.watch('../build/js/**/*.js', javascript);
  gulp.watch('../build/sass/**/*.scss', css);
});