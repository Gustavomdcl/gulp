const gulp = require('gulp');

require('./gulpTasks/javascript');
require('./gulpTasks/css');
require('./gulpTasks/html');
require('./gulpTasks/image');
require('./gulpTasks/iconfont');
require('./gulpTasks/server');

exports.default = gulp.parallel('javascript', 'css', 'html', 'image', 'iconfont', 'server');
