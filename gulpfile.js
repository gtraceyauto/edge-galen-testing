var gulp = require('gulp');
var gulpGalen = require('gulp-galen');

gulp.task('test', function() {
  gulp.src('tests/*.test.js').pipe(gulpGalen.test());
});
