'use strict';
// Include gulp and other npm modules
var gulp = require('gulp');

// Define base folders
var src = 'src/';
var dest = 'build/';

// Include plugins
var plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

// Copy and minify HTML
gulp.task('html', function() {
  return gulp.src(src + 'index.html')
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(dest));
});

// Concatenate, minify, organize, and auto-prefix CSS
gulp.task('css', function() {
  var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']  // Include last two versions of all browsers, browsers with over 5% market share, and FireFox ESR
  };
  return gulp.src(src + 'css/style.css')
    .pipe(plugins.autoprefixer(autoprefixerOptions))
    .pipe(plugins.cleanCss({keepSpecialComments: 0}))
    .pipe(gulp.dest(dest + 'css'));
});

//Minify and Cache images
gulp.task('images', function() {
  return gulp.src(src + 'img/**/*')
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(dest + 'img'));
});

gulp.task('copy', function() {
  return gulp.src([src + '404.html', src + '.htaccess', src + '*.png', src + '*.xml', src + '*.txt'])
    .pipe(gulp.dest(dest));
});

// Watch for changes in files
gulp.task('watch', function() {
  gulp.watch(src + 'index.html', ['html']);
  gulp.watch(src + 'css/*.css', ['css']);
  gulp.watch(src + 'img/**/*', ['images']);
});

// Default Task
gulp.task('default', ['html', 'css', 'images', 'copy', 'watch']);