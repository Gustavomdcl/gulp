const gulp = require('gulp'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
compass = require( 'gulp-for-compass' ),
webserver = require('gulp-webserver'),
minifyCSS = require('gulp-minify-css');

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
  })).pipe(minifyCSS())
  .pipe(gulp.dest('css'));

  cb();
}

exports.default = function() {
	gulp.watch('../build/js/**/*.js', javascript);
  gulp.watch('../build/sass/**/*.scss', css);
  gulp.src('../course')
  .pipe(webserver({
      livereload: true,
      port: 4444,
      open: true
  }));
};