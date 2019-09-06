const gulp = require('gulp');
const webserver = require('gulp-webserver');

gulp.task('server', function() {
	gulp.src('../course')
		.pipe(webserver({
		livereload: true,
		port: 4444,
		open: true
	}));
});