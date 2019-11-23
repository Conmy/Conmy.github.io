var child = require('child_process');
var gulp = require('gulp');
var del = require('del');
var log = require('fancy-log');

var sass = require('gulp-sass');
sass.compiler = require('node-sass');

const jekyllLogger = (buffer) => {
  buffer.toString().split(/\n/)
    .forEach((message) => {
      log('Jekyll: ' + message)
    });
};

gulp.task('clean', () => {
  return del([
    './assets/vendor/**/*',
    './_sass/bootstrap',
    './_site/**/*',
    './assets/css/main.css'
  ]);
});

gulp.task('sass', () => {
  return gulp.src('./assets/css/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./assets/css'));
})

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
    ]).pipe(gulp.dest('_sass/bootstrap'));
});

gulp.task('jekyll-serve', () => {
  const serveProcess = child.spawn('bundle', ['exec', 'jekyll', 'serve', '--watch', '--livereload']);
  
  serveProcess.stdout.on('data', jekyllLogger);
  serveProcess.stderr.on('data', jekyllLogger);
});

gulp.task('jekyll-build', (done) => {
  const buildProcess = child.spawn('bundle', ['exec', 'jekyll', 'build', '--verbose']);

  buildProcess.stdout.on('data', jekyllLogger);
  buildProcess.stderr.on('data', jekyllLogger);
  done();
});

gulp.task('shared-setup', gulp.series('clean', gulp.parallel('copy-node-module-js-dependencies', 'copy-node-module-bootstrap-scss'), 'sass'));

gulp.task('serve', gulp.series('shared-setup', 'jekyll-serve'));
gulp.task('build', gulp.series('shared-setup', 'jekyll-build'));