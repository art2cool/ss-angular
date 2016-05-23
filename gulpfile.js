'use strict';

var gulp = require('gulp'),
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

gulp.task('mocha', function() {
    return gulp.src(['./test/*.js'], {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.run('mocha');
    gulp.watch(['./**/*.js', 'test/**/*.js'], ['mocha'])
});

gulp.task('default', ['server', 'watch-mocha']);