const child = require('child_process');
const gulp = require('gulp');
const del = require('del');
const log = require('fancy-log');

const { Transform } = require('stream');
const YAML = require('yaml');
const md5 = require('md5');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

// Pipeline stream for generating gravatarIds in info.yml
const generateGravatarId = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform: function(chunk, encoding, done) {
    const info = YAML.parse(chunk.contents.toString());
    if (info.email) {
      var gravatarId = md5(info.email.trim().toLowerCase());
      info.gravatarId = gravatarId;
    }
    chunk.contents = Buffer.from(YAML.stringify(info));
    done(null, chunk);
  }
});

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
    ]).pipe(gulp.dest('_sass/bootstrap'));
});

gulp.task('jekyll-serve', () => {
  const serveProcess = child.spawn('bundle', ['exec', 'jekyll', 'serve', '--drafts', '--watch', '--livereload', '-o']);
  
  serveProcess.stdout.on('data', jekyllLogger);
  serveProcess.stderr.on('data', jekyllLogger);
});

gulp.task('jekyll-live-preview', () => {
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

gulp.task('generate-gravatar-ids', () => {
  return gulp.src('./_data/info.yml')
      .pipe(generateGravatarId)
      .pipe(gulp.dest('./_data/'));
})

gulp.task('shared-setup', 
    gulp.series(
      'clean',
      gulp.parallel('copy-node-module-js-dependencies', 'copy-node-module-bootstrap-scss'),
      //'sass',
      'generate-gravatar-ids'
    )
  );

gulp.task('serve', gulp.series('shared-setup', 'jekyll-serve'));
gulp.task('preview', gulp.series('shared-setup', 'jekyll-live-preview'));
gulp.task('build', gulp.series('shared-setup', 'jekyll-build'));