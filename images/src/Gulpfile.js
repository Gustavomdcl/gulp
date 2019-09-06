const { watch, src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const compass = require( 'gulp-for-compass' );

const imagemin = require('gulp-imagemin');

const image = require('gulp-image');

function javascript(cb) {

	return src('../build/js/**/*.js')
    // The gulp-uglify plugin won't update the filename
    .pipe(uglify())
    // So use gulp-rename to change the extension
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('../assets/min/'));

  // body omitted
  cb();
}


function css(cb) {

  return src('../build/sass/**/*.scss')
  .pipe(compass({
      sassDir: '../build/sass',
      cssDir: '../assets/css',
      force: true
  }));

  // body omitted
  cb();
}

function img(cb) {

  // return src('../build/img/**/*')
  // .pipe(compass({
  //     sassDir: '../build/sass',
  //     cssDir: '../assets/css',
  //     force: true
  // }));

  // return src('../build/img/**/*')
  // .pipe(imagemin({
  //     progressive: true,
  //     svgoPlugins: [{removeViewBox: false}],
  //     use: [pngquant()]
  // }))
  // .pipe(dest('../assets/img'));

  // return src('../build/img/**/*')
  // .pipe(imageOptim.optimize())
  // .pipe(dest('../assets/img'));

  //CERTO =====
              // return src('../build/img/**/*')
              // .pipe(imagemin([
              //     imagemin.gifsicle({interlaced: true}),
              //     imagemin.jpegtran({progressive: true}),
              //     imagemin.optipng({optimizationLevel: 5}),
              //     imagemin.svgo({
              //         plugins: [
              //             {removeViewBox: true},
              //             {cleanupIDs: false}
              //         ]
              //     })
              // ]))
              // .pipe(dest('../assets/img'));



              src('../build/img/**/*')
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
              .pipe(dest('../assets/img'));



  // body omitted
  cb();
}

exports.default = function() {
	watch('../build/js/**/*.js', javascript);
  watch('../build/sass/**/*.scss', css);
  watch('../build/img/**/*', img);
}






/*const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

exports.default = function() {
  return src('lib/*.js')
    // The gulp-uglify plugin won't update the filename
    .pipe(uglify())
    // So use gulp-rename to change the extension
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/'));
}*/






/*var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

gulp.task('js-fef', function(){
    return 
    	//gulp.src(['src/*.js', 'file2.js', 'file3.js'])
    	gulp.src('lib/*.js')
        .pipe(gp_concat('concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gp_rename('uglify.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js-fef'], function(){});*/






/*const { watch, series } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.default = function() {
  // You can use a single task
  watch('src/*.css', css);
  // Or a composed task
  watch('src/*.js', series(clean, javascript));
}; */