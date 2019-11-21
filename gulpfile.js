var child = require('child_process');
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var browserSync = require('browser-sync').create();

const jekyllLogger = (buffer) => {
  buffer.toString().split(/\n/)
    .forEach((message) => {
      gutil.log('Jekyll: ' + message)
    });
};

gulp.task('clean', () => {
  return del([
    './assets/vendor/**/*',
    './_site/**/*'
  ]);
});

gulp.task('copy-node-module-js-dependencies', () => {
  return gulp.src([
      'node_modules/jquery/dist/jquery.min.js*',
      'node_modules/popper.js/dist/umd/popper.min.js*',
      'node_modules/bootstrap/dist/js/bootstrap.min.js*'
    ]).pipe(gulp.dest('assets/vendor/js/'));
});

gulp.task('copy-node-module-bootstrap-scss', () => {
  return gulp.src([
      'node_modules/bootstrap/scss/**'
    ]).pipe(gulp.dest('assets/vendor/scss/bootstrap'));
});

gulp.task('jekyll-serve', () => {
  const serveProcess = child.spawn('jekyll', ['serve', '--watch', '--livereload']);
  
  serveProcess.stdout.on('data', jekyllLogger);
  serveProcess.stderr.on('data', jekyllLogger);
});

gulp.task('jekyll-build', (done) => {
  const buildProcess = child.spawn('jekyll', ['build']);

  buildProcess.stdout.on('data', jekyllLogger);
  buildProcess.stderr.on('data', jekyllLogger);
  done();
});

// Static browser-sync reload server
gulp.task('browser-sync', function() {
  
});

gulp.task('shared-setup', gulp.series('clean', gulp.parallel('copy-node-module-js-dependencies', 'copy-node-module-bootstrap-scss')));

gulp.task('serve', gulp.series('shared-setup', 'jekyll-serve', 'browser-sync'));
gulp.task('build', gulp.series('shared-setup', 'jekyll-build'));