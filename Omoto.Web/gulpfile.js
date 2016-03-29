/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var inject = require("gulp-inject");
var concat = require("gulp-concat");
var angularFilesort = require('gulp-angular-filesort');
var wiredep = require('wiredep');
var clean = require('gulp-clean');
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var plugins = require('gulp-load-plugins');
var gulpBowerFiles = require("gulp-bower-files");
var angularFilesort = require('gulp-angular-filesort');

var paths = {
    lib: "bower_components",
    src: "src",
    dist: "wwwroot"
};


gulp.task('clean-all', function () {
    return gulp.src(paths.dist + '/*').pipe(clean());
});


gulp.task('vendor-scripts', function () {

    return gulp.src(wiredep().js)

      .pipe(gulp.dest(paths.dist+'/vendor'));

});

gulp.task('vendor-css', function () {

    return gulp.src(wiredep().css)

      .pipe(gulp.dest(paths.dist + '/vendor'));

});


gulp.task('index', function() {
    
        return gulp.src(paths.src+'/index.html')
          .pipe(wiredep.stream({
              exclude: [/jquery/],
              fileTypes: {
                  html: {
                      replace: {
                          js: function(filePath) {
                              return '<script src="' + 'vendor/' + filePath.split('/').pop() + '"></script>';
                          },
                          css: function(filePath) {
                              return '<link rel="stylesheet" href="' + 'vendor/' + filePath.split('/').pop() + '"/>';
                          }
                      }
                  }
              }
          }))
    .pipe(inject(gulp.src([paths.src + '/app/**/*.js'], { read: false }),
    {
        name: 'app',
        addRootSlash: false,
        transform: function (filePath, file, i, length) {
            return '<script src="' + filePath.replace('src/', '') + '"></script>';
        }
    }))
    .pipe(inject(gulp.src([paths.src + '/css/**/*.css'], { read: false }),
    {
        name: 'app',
        addRootSlash: false,
        transform: function (filePath, file, i, length) {
            return ' <link href="' + filePath.replace('src/', '') + '" rel="stylesheet" />';
        }
    }))
          .pipe(gulp.dest(paths.dist))
    });

gulp.task('copy-app', function () {
    gulp.src(paths.src + "/**/*")
        .pipe(gulp.dest(paths.dist))
});

//gulp.task('build-index', function () {

//    gulp.src(paths.src + "/index.html")
//    .pipe(inject(gulp.src([paths.dist + '/vendor/**/*.js']),
//    {
//        name: 'vendor',
//        addRootSlash: false,
//        transform: function (filePath, file, i, length) {
//            return '<script src="' + filePath.replace('wwwroot/','') + '"></script>';
//        }
//    }))
//    .pipe(inject(gulp.src([paths.dist + '/vendor/**/*.css'], { read: false }),
//    {
//        name:'vendor',
//        addRootSlash: false,
//        transform: function (filePath, file, i, length) {
//            return ' <link href="' + filePath.replace('wwwroot/', '') + '" rel="stylesheet" />';
//        }
//    }))
//    .pipe(inject(gulp.src([paths.dist + '/app/**/*.js'], { read: false }),
//    {
//        name: 'app',
//        addRootSlash: false,
//        transform: function (filePath, file, i, length) {
//            return '<script src="' + filePath.replace('wwwroot/', '') + '"></script>';
//        }
//    }))
//    .pipe(inject(gulp.src([paths.dist + '/css/**/*.css'], { read: false }),
//    {
//        name: 'app',
//        addRootSlash: false,
//        transform: function (filePath, file, i, length) {
//            return ' <link href="' + filePath.replace('wwwroot/', '') + '" rel="stylesheet" />';
//            return 'a';
//        }
//    }))
//    .pipe(gulp.dest(paths.dist));

//});
gulp.task('fonts', function () {
    return gulp.src([
                    'bower_components/bootstrap/fonts/glyphicons-halflings-regular.*'])
            .pipe(gulp.dest('wwwroot/fonts/'));
});
gulp.task('rebuild-all', ['clean-all', 'vendor-scripts', 'vendor-css','fonts','copy-app', 'index']);
//gulp.task('watch', function () {
//    gulp.watch(paths.lib + '/*', ['clean-all', 'copy-vendors', 'copy-app', 'build-index']);
//    gulp.watch(paths.src + '/*', ['clean-all', 'copy-vendors', 'copy-app', 'build-index']);
//});