var
  gulp = require('gulp'),
  gulpGalen = require('gulp-galen'),
  del = require('del'),
  argv = require('yargs').argv,
  reportsDir = 'reports';

var widgetToTest = argv.w ? argv.w : '*';

gulp.task('clean', function(done) {
  del([reportsDir], function(err) {
      if (err) {
          throw err;
      }
      done();
  });
});

gulp.task('test', function(done) {
  gulp
    .src(`tests/${widgetToTest}.test.js`)
    .pipe(gulpGalen.test({
      htmlreport: reportsDir
    }, done()));
});
