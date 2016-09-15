var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');

gulp.task('scripts', function() {
  return gulp.src(['./src/**/app.js', './src/**/*.js']) 
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('styles', function() {
  return gulp.src('./src/styles/sass/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css/'))
});

gulp.task('watch', function() {
  gulp.watch('./src/scripts/**/*.js', ['scripts']);
  gulp.watch('./src/styles/**/*.scss', ['styles']);
});

gulp.task('server', function() {
  return gulp.src('./public')
    .pipe(webserver({
      port: 8085,
      livereload: true,
      open: true
    }));
});

gulp.task('start', ['watch', 'server']);

  
