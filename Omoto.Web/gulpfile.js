/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
//    rimraf = require("rimraf"),
//    concat = require("gulp-concat"),
//    cssmin = require("gulp-cssmin"),
//    uglify = require("gulp-uglify");
preprocess = require("gulp-preprocess");

//var paths = {
//    webroot: "./wwwroot/"
//};

//paths.js = paths.webroot + "js/**/*.js";
//paths.minJs = paths.webroot + "js/**/*.min.js";
//paths.css = paths.webroot + "css/**/*.css";
//paths.minCss = paths.webroot + "css/**/*.min.css";
//paths.concatJsDest = paths.webroot + "js/site.min.js";
//paths.concatCssDest = paths.webroot + "css/site.min.css";

//gulp.task("clean:js", function (cb) {
//    rimraf(paths.concatJsDest, cb);
//});

//gulp.task("clean:css", function (cb) {
//    rimraf(paths.concatCssDest, cb);
//});

//gulp.task("clean", ["clean:js", "clean:css"]);

//gulp.task("min:js", function () {
//    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
//        .pipe(concat(paths.concatJsDest))
//        .pipe(uglify())
//        .pipe(gulp.dest("."));
//});

//gulp.task("min:css", function () {
//    return gulp.src([paths.css, "!" + paths.minCss])
//        .pipe(concat(paths.concatCssDest))
//        .pipe(cssmin())
//        .pipe(gulp.dest("."));
//});

//gulp.task("min", ["min:js", "min:css"]);




gulp.task('phone-real', function () {
    //js
    gulp.src('./gulp_preprocess/scripts/**/*.js')
    .pipe(preprocess({ context: { NODE_ENV: 'REAL' } }))
    .pipe(gulp.dest('../Omoto.Phone/www/scripts'));
    //css
    gulp.src('./gulp_preprocess/css/**/*.css')
    .pipe(preprocess({ context: { NODE_ENV: 'REAL' } }))
    .pipe(gulp.dest('../Omoto.Phone/www/css'));
    //fonts
    gulp.src('./gulp_preprocess/css/fonts/*.*')
    .pipe(preprocess({ context: { NODE_ENV: 'REAL' } }))
    .pipe(gulp.dest('../Omoto.Phone/www/fonts'));
    //html
    gulp.src('./gulp_preprocess/**/*.html')
    .pipe(preprocess({ context: { NODE_ENV: 'REAL' } }))
    .pipe(gulp.dest('../Omoto.Phone/www/'));
});
gulp.task('phone-mock', function () {
    //js
    gulp.src('./gulp_preprocess/scripts/**/*.js')
    .pipe(preprocess({ context: { NODE_ENV: 'MOCK' } }))
    .pipe(gulp.dest('../Omoto.Phone/www/scripts'));
    //css
    gulp.src('./gulp_preprocess/css/**/*.css')
    .pipe(preprocess({ context: { NODE_ENV: 'MOCK' } }))
    .pipe(gulp.dest('../Omoto.Phone/www/css'));
    //fonts
    gulp.src('./gulp_preprocess/css/fonts/*.*')
    .pipe(preprocess({ context: { NODE_ENV: 'MOCK' } }))
    .pipe(gulp.dest('../Omoto.Phone/www/fonts'));
    //html
    gulp.src('./gulp_preprocess/**/*.html')
    .pipe(preprocess({ context: { NODE_ENV: 'MOCK' } }))
    .pipe(gulp.dest('../Omoto.Phone/www/'));
});


gulp.task('desktop-real', function () {
    //js
    gulp.src('./gulp_preprocess/scripts/**/*.js')
    .pipe(preprocess({ context: { NODE_ENV: 'REAL' } }))
    .pipe(gulp.dest('./wwwroot/scripts'));
    //css
    gulp.src('./gulp_preprocess/css/**/*.css')
    .pipe(preprocess({ context: { NODE_ENV: 'REAL' } }))
    .pipe(gulp.dest('./wwwroot/css'));
    //fonts
    gulp.src('./gulp_preprocess/css/fonts/*.*')
    .pipe(preprocess({ context: { NODE_ENV: 'REAL' } }))
    .pipe(gulp.dest('./wwwroot/css/fonts'));
    //html
    gulp.src('./gulp_preprocess/**/*.html')
    .pipe(preprocess({ context: { NODE_ENV: 'REAL' } }))
    .pipe(gulp.dest('./wwwroot/'));
});

gulp.task('desktop-mock', function () {
    //js
    gulp.src('./gulp_preprocess/scripts/**/*.js')
    .pipe(preprocess({ context: { NODE_ENV: 'MOCK' } }))
    .pipe(gulp.dest('./wwwroot/scripts'));
    //css
    gulp.src('./gulp_preprocess/css/**/*.css')
    .pipe(preprocess({ context: { NODE_ENV: 'MOCK' } }))
    .pipe(gulp.dest('./wwwroot/css'));
    //fonts
    gulp.src('./gulp_preprocess/css/fonts/*.*')
    .pipe(preprocess({ context: { NODE_ENV: 'MOCK' } }))
    .pipe(gulp.dest('./wwwroot/css/fonts'));
    //html
    gulp.src('./gulp_preprocess/**/*.html')
    .pipe(preprocess({ context: { NODE_ENV: 'MOCK' } }))
    .pipe(gulp.dest('./wwwroot/'));
});