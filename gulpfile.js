var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

gulp.task('default', ['minify-sass','minify-scripts','images','copy-index', 'watch']);

gulp.task('minify-scripts', function() {
  return gulp.src([
    "assets/scripts/jquery-2.1.4.min.js",
    "assets/scripts/script.js"
    ]) // this is not just *.js because it does it in the wrong order
  .pipe(concat('script.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/assets/scripts')) // dist/assets
  .pipe(gulp.dest('./assets/scripts')); //assets
});

gulp.task('minify-less', function() {
  return gulp.src('./assets/styles/*.less')
  .pipe(less())
  .pipe(minifyCSS())
  .pipe(gulp.dest('./assets/styles/'));
});

gulp.task('minify-sass', function() {
  return gulp.src('./assets/styles/style.scss') // use @import in style instead of concating all less files
  .pipe(sass())
  .pipe(minifyCSS())
  .pipe(gulp.dest('./assets/styles')); // put in assets/styles
});

gulp.task('merge-css', function() {
  return gulp.src(['assets/styles/style.css', 'assets/styles/foo.css'])
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('./assets/styles')) // put in assets/styles
  .pipe(gulp.dest('./dist/assets/styles')); // put in dist/assets/styles
});

gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    //.pipe(imagemin({optimizationLevel: 5})).on('error', errorHandler)
    .pipe(gulp.dest('dist/assets/images'))
});

gulp.task('copy-index', function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./dist'))
});

gulp.task('fonts', function() {
  return gulp.src('assets/webfontkit/*')
  .pipe(gulp.dest('./dist/assets/styles'));
});

gulp.task('watch', function(){
  gulp.watch('assets/styles/*.less', ['minify-less']);
  gulp.watch('assets/styles/*.scss', ['minify-sass']);
  gulp.watch('assets/styles/*.css', ['merge-css']);
  gulp.watch('assets/scripts/*.js', ['minify-scripts']);
  gulp.watch('assets/images/**/*', ['images']);
  gulp.watch('assets/webfontkit/*', ['fonts']);
  gulp.watch('./index.html', ['copy-index']);
});