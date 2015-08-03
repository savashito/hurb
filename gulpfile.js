var gulp = require('gulp');
var install = require("gulp-install");
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');

var env = process.env.NODE_ENV || 'development';

gulp.task('default', ['build', 'nodemon']);

gulp.task('build', function (callback) {
    return gulp.src(['./bower.json', './package.json'])
        .pipe(install());
    callback();
});

gulp.task('nodemon', ['build'], function () {
    nodemon({
        script: 'server.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
});


