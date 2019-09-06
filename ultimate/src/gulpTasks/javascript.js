const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function Javascript(cb) {

	return gulp.src('../build/js/**/*.js')
	.pipe(uglify())
	.pipe(rename({ extname: '.min.js' }))
	.pipe(gulp.dest('../course/assets/js/'));

	cb();
}

gulp.task('javascript', function() {
	gulp.watch('../build/js/**/*.js', Javascript);
});