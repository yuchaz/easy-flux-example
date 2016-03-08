// gulpfile.js
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');


gulp.task('build', function () {
  return browserify({
    entries: 'app.js',
    extensions: ['.jsx'],
    debug: true
  })
  .transform('babelify', {'presets': ['es2015', 'react']})
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      // .pipe(uglify())
      .on('error', gutil.log)
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
  return gulp.src('./dist/bundle.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

// gulp.task('default', function(cb) {
//   runSequence('build','compress', cb);
// });


gulp.task('default', function(cb) {
  runSequence('build', cb);
});
