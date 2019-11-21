var child = require('child_process');
const gulp = require('gulp');
var gutil = require('gulp-util');

const jekyllLogger = (buffer) => {
  buffer.toString().split(/\n/)
    .forEach((message) => {
      gutil.log('Jekyll: ' + message)
    });
};

gulp.task('copy-node-module-js-dependencies', () => {
  return gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js'
    ]).pipe(gulp.dest('assets/vendor/js/'));
});

gulp.task('copy-node-module-bootstrap-scss', () => {
  return gulp.src([
      'node_modules/bootstrap/scss/**'
    ]).pipe(gulp.dest('assets/vendor/scss/bootstrap'));
});

gulp.task('jekyll-serve', () => {
  const jekyll = child.spawn('jekyll', ['serve']);
  
  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('jekyll-build', (done) => {
  const buildProcess = child.exec('jekyll build');

  buildProcess.stdout.on('data', jekyllLogger);
  buildProcess.stderr.on('data', jekyllLogger);
  done();
});

gulp.task('serve', gulp.series('copy-node-module-js-dependencies', 'copy-node-module-bootstrap-scss', 'jekyll-serve'));
gulp.task('build', gulp.series('copy-node-module-js-dependencies', 'copy-node-module-bootstrap-scss', 'jekyll-build'));