var
  gulp = require('gulp'),
  del = require('del'),
  tap = require('gulp-tap'),
  index = require('serve-index'),
  ip = require('ip'),
  serve = require('gulp-serve'),
  spawn = require('cross-spawn'),
  async = require('async'),
  argv = require('yargs').argv,
  jar = require('selenium-server-standalone-jar');

var moduleToTest = argv.w ? argv.w : '*';
var whereToTest = argv.l ? argv.l : 'local';
var reportsDir = 'reports';
var gridHubUrl = 'http://10.203.220.61:4444/grid/register/';
var parallelTests = whereToTest == 'local' ? 3 : 1;

//Task to erase previous test reports
gulp.task('clean', function(done) {
  del([reportsDir + '/' + moduleToTest]);
  done();
});

//Task to test Edge
gulp.task('testEdge', function(done) {
  var files = [];
  var galen = function galen(file, callback) {
    spawn('galen', [
      'test',
      file.path,
      '--htmlreport',
      reportsDir + '/' + file.relative.replace(/\.test.js/, ''),
      '--parallel-tests', parallelTests
    ], {'stdio' : 'inherit'}).on('close', function(code) {
      callback(code === 0);
    });
  };

  return gulp.src([`tests/${moduleToTest}.${whereToTest}.test.js`])
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

//Task to cast reports to local ip
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
    'hostname' : ip.address(),
    'port' : 3333,
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
    '-hub', gridHubUrl,
    '-host', ip.address()
  ]);
  done();
});

//Serialized tasks
gulp.task('test', gulp.series('clean', 'testEdge', function(done) {
  done();
}));

gulp.task('testAndReport', gulp.series('clean', 'testEdge', 'serve', function(done) {
  done();
}));

gulp.task('default', gulp.series('test'));
