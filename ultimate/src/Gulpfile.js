const gulp = require('gulp'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
compass = require( 'gulp-for-compass' ),
webserver = require('gulp-webserver'),
minifyCSS = require('gulp-minify-css'),
image = require('gulp-image');

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
  .pipe(rename({ extname: '.min.css' }))
  .pipe(gulp.dest('css'));

  cb();
}

function img(cb) {

  return gulp.src('../build/img/**/*')
  .pipe(image({
    pngquant: true,
    optipng: false,
    zopflipng: true,
    jpegRecompress: false,
    jpegoptim: true,
    mozjpeg: true,
    gifsicle: true,
    svgo: true,
    concurrent: 10
  }))
  .pipe(gulp.dest('../course/assets/img'));

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

exports.default = function() {
	gulp.watch('../build/js/**/*.js', javascript);
  gulp.watch('../build/sass/**/*.scss', css);
  gulp.watch('../build/img/**/*', img);
  server();
};