const gulp = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');

function Html(cb) {

  //return gulp.src('../build/html/**/*.html')
  return gulp.src(['../build/html/header.html','../build/html/content.html','../build/html/footer.html'])
  .pipe(concat('index.html'))
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('../course/'));

  cb();
}

gulp.task('html', function() {
	gulp.watch('../build/html/**/*.html', Html);
});