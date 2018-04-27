var
  gulp = require('gulp'),
  del = require('del'),
  tap = require('gulp-tap'),
  index = require('serve-index'),
  serve = require('gulp-serve'),
  spawn = require('child_process').spawn,
  async = require('async'),
  argv = require('yargs').argv,
  jar = require('selenium-server-standalone-jar');

var widgetToTest = argv.w ? argv.w : '*';
var reportsDir = 'reports';
var port = 3333;
var gridHubUrl = 'http://localhost:4444/grid/register';

//Task to erase previous test reports
gulp.task('clean', function(done) {
  if (widgetToTest == '*') {
    del ([reportsDir]);
  } else {
    del([reportsDir + '/' + widgetToTest]);
  };
  done();
});

//Task to test Widgets locally
gulp.task('testWidgets', function(done) {
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

  return gulp.src([`tests/${widgetToTest}.test.js`])
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

//Task to test Widgets remotely
gulp.task('testWidgetsRemote', function(done) {
  var files = [];
  var galen = function galen(file, callback) {
    spawn('galen', [
      'test',
      file.path,
      '--htmlreport',
      reportsDir + '/' + file.relative.replace(/\.test.js/, ''),
      '--parallel-tests', 3
    ], {'stdio' : 'inherit'}).on('close', function(code) {
      callback(code === 0);
    });
  };

  return gulp.src([`tests/${widgetToTest}.remote.test.js`])
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

//Task to cast reports to localhost
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

//Selenium grid tasks
gulp.task('grid-hub', function(done) {
  spawn('java', ['-jar', jar.path, '-role', 'hub']);
  done();
});

gulp.task('grid-node', function(done) {
  spawn('java', [
    '-jar', jar.path,
    '-role', 'node',
    '-hub', gridHubUrl])
});

//Serialized tasks
gulp.task('test', gulp.series('clean', 'testWidgets', 'serve', function(done) {
  done();
}));

gulp.task('testRemote', gulp.series('clean', 'testWidgetsRemote', 'serve', function(done) {
  done();
}));

gulp.task('t', gulp.series('testWidgets'));
gulp.task('tr', gulp.series('testWidgetsRemote'));
gulp.task('default', gulp.series('test'));
