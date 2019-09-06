const gulp = require('gulp');
const image = require('gulp-image');

function Image(cb) {

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

gulp.task('image', function() {
	gulp.watch('../build/img/**/*', Image);
});