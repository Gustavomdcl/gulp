const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

function Javascript(cb) {

	return gulp.src('../build/js/**/*.js')
	.pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(rename({ extname: '.min.js' }))
	.pipe(gulp.dest('../course/assets/js/'));

	cb();
}

gulp.task('javascript', function() {
	gulp.watch('../build/js/**/*.js', Javascript);
});