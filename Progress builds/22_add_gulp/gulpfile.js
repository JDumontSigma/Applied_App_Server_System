'use strict';

var gulp = require('gulp');
var concatCSS = require('gulp-concat-css');
var exec = require('child_process').exec;



gulp.task('compileCSS', function(){
  return gulp.src('static/uploaded/*.css')
    .pipe(concatCSS('main.css'))
    .pipe(gulp.dest('static/css'));
});


gulp.task('watch',function(){
  console.log('watching files');
  gulp.watch('static/uploaded/*.css',['compileCSS']);
});

gulp.task('start',function(){
  exec('pm2 start app.js', function(){
      console.log('Everything is up and running smoothly');
  });
});


gulp.task('default',['compileCSS','watch','start']);
