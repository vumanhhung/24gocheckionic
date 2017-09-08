/// <binding BeforeBuild='default' />
var gulp = require('gulp');
//var gulpDocs = require('gulp-ngdocs');
//var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
//var sh = require('shelljs');
var zip = require('gulp-zip');
var minify = require('gulp-minify');
var annotate = require('gulp-ng-annotate');
var del = require('del');

var paths = {
    sass: ['./www/css/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src(['./www/css/style-main.scss'])
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
        keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('package', function (done) {
    gulp.src(['./**', '!./node_modules/**/*', '!./platforms/**/*', '!./tests/**/*', '!./archive.zip', '!./MobileShoppingCart.*', '!./*.keystore', '!./bin'])
         .pipe(zip('archive.zip'))
         .pipe(gulp.dest('./'))
         .on('end', done);
});

gulp.task('dist', ['copy', 'compress', 'combine', 'clean']);

gulp.task('copy', function(done) {
	gulp.src(['./www/**', '!./www/dist/'])
		.pipe(gulp.dest('./www/dist/'))
		.on('end', done);
})

gulp.task('compress', function(done) {
  gulp.src(['./www/dist/app/**/*.js', './www/dist/app/*.js'])
	.pipe(annotate())
    .pipe(minify({
		noSource : true,
        ext:{
            min:'.js'
        },
        exclude: ['tasks'],
    }))
    .pipe(gulp.dest('./www/dist/temp/app'))
	.on('end', done);
});

gulp.task('combine', function(done) {
  gulp.src(['./www/dist/temp/app/*.js', './www/dist/temp/app/**/*.module.js', './www/dist/temp/app/**/*.config.js', './www/dist/temp/app/**/*.service.js', './www/dist/temp/app/**/*.controller.js', './www/dist/temp/app/common/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./www/dist/'))
	.on('end', done);
});

gulp.task('clean', function () {
    del(['./www/dist/temp/', './www/dist/app/**/*.js', './www/dist/app/*.js']);
});