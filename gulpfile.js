'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    nodemon = require('gulp-nodemon'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util');
//TODO add builder
//--concat js
//--min.js
//add test
//front test

gulp.task('server', function () {
    
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            NODE_ENV: 'test'
        },
        ignore: ['./node_modules/**', './test/**/*.js']
    })
    .on('restart', function () {
        console.log('Restarting');
    });
});

/*
    Concat AngularJS application
*/
gulp.task('build-app', function () {
    gulp.src(['client/public/js/**/*.js'])
        .pipe(plumber())
        .pipe(concat('book-app.js'))
        .pipe(gulp.dest('client/public/dist/js/'));
});

gulp.task('watch-app', function() {
    gulp.watch(['client/public/js/**/*.js'], ['build-app'])
});

gulp.task('mocha', function() {
    return gulp.src(['./test/*.js'], {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.run('mocha');
    gulp.watch(['./**/*.js', 'test/**/*.js'], ['mocha'])
});

gulp.task('test', ['server', 'watch-mocha']);

gulp.task('watch', ['build-app', 'watch-app']);