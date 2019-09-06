const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

function Html(cb) {

  return gulp.src('../build/html/**/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('../course/'));

  cb();
}

gulp.task('html', function() {
	gulp.watch('../build/html/**/*.html', Html);
});