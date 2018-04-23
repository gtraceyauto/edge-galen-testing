var
  gulp = require('gulp'),
  gulpGalen = require('gulp-galen'),
  del = require('del'),
  tap = require('gulp-tap'),
  index = require('serve-index'),
  serve = require('gulp-serve'),
  spawn = require('child_process').spawn,
  async = require('async'),
  argv = require('yargs').argv;

var widgetToTest = argv.w ? argv.w : '*';
var reportsDir = 'reports';
var port = 3333;

//Tasks for testing one widget
gulp.task('cleanDir', function(done) {
  del([reportsDir + '/' + widgetToTest]);
  done();
});

gulp.task('testOneWidget', function(done) {
  gulp
    .src(`tests/${widgetToTest}.test.js`)
    .pipe(gulpGalen.test({
      htmlreport: reportsDir + '/' + widgetToTest
    }, done()));
});

//Tasks for testing all widgets
gulp.task('cleanAll', function(done) {
  del ([reportsDir]);
  done();
});

gulp.task('testAllWidgets', function(done) {
  var files = [];
  var galen = function galen(file, callback) {
    spawn('galen', [
      'test',
      file.path,
      '--htmlreport',
      reportsDir + '/' + file.relative.replace(/\.test.js/, '')
    ], {'stdio' : 'inherit'}).on('close', function(code) {
      callback(code === 0);
    });
  };

  return gulp.src(['tests/*.test.js'])
    .pipe(tap(function(file) {
      files.push(file);
    }))
    .on('end', function() {
      async.rejectSeries(files, function(file, finished) {
          galen(file, finished);
      }, function(errors) {
         if (errors && errors.length > 0) {
            done("Galen reported failed tests: " + (errors.map(function(f) {
               return f.relative;
            }).join(", ")));
         }
         else {
            done();
         }
      });
    });
});

gulp.task('serve', serve({
    'middleware' : function (req, res, next) {
        index(reportsDir, {
            'filter'     : false,
            'hidden'     : true,
            'icons'      : true,
            'stylesheet' : false,
            'template'   : false,
            'view'       : 'details'
        })(req, res, next);
    },
    'port' : port,
    'root' : reportsDir
}));

gulp.task('testOne', gulp.series('cleanDir', 'testOneWidget', 'serve'));
gulp.task('testAll', gulp.series('cleanAll', 'testAllWidgets', 'serve'));
