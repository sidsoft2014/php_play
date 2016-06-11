/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp'),
    angularFilesort = require('gulp-angular-filesort'),
    manifest = require('gulp-appcache'),
    prefix = require('gulp-autoprefixer'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    gulpIf = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    inject = require('gulp-inject'),
    rename = require('gulp-rename'),
    runSeq = require('run-sequence'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    watch = require('gulp-watch'),
    del = require('del'),
    paths = {
        pages: {
          src: './dev/templates/pages',
          files: './dev/templates/pages/**/*.*',
          dest: './public_html/templates/pages'
        },
        webparts: {
          src: './dev/templates/webparts',
          files: './dev/templates/webparts/**/*.*',
          dest: './public_html/templates/webparts'
        },
        scripts: {
          src: './dev/sitefiles/scripts/js',
          files: './dev/sitefiles/scripts/js/**/*.js',
          dest: './public_html/sitefiles/scripts/js'
        },
        angular: {
          src: './dev/sitefiles/scripts/ng',
          files: './dev/sitefiles/scripts/ng/**/*.js',
          dist: './dist/sitefiles/scripts/ng'
        },
        styles: {
            src: './dev/sitefiles/styles/sass',
            files: './dev/sitefiles/styles/sass/**/*.scss',
            dest: './dev/sitefiles/styles/css'
        },
        css: {
            src: './dev/sitefiles/styles/css',
            files: './dev/sitefiles/styles/css/**/*.css',
            dest: './dist/sitefiles/styles/css'
        },
        folders: {
            root: './public_html',
            sitefiles: './public_html/sitefiles'
        }
    },
    displayError = function(error) {
        var errorString = '[' + error.plugin + ']';
        errorString += ' ' + error.message.replace("\n",'');
        if(error.fileName)
            errorString += ' in ' + error.fileName;
        if(error.lineNumber)
            errorString += ' on line ' + error.lineNumber;
        console.error(errorString);
    };

    gulp.task('clean:dist', function(){
        return del('public_html');
    });

gulp.task('sass', function () {
    gulp.src(paths.styles.files)
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .on('error', function(err){
        displayError(err);
    })
    .pipe(prefix(
        'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
    ))
    .on('error', function(err){
        displayError(err);
    })
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('copy:dev', function(){
   gulp.src(paths.pages.files).pipe(gulp.dest(paths.pages.dest));
   console.log('Copied ' + paths.pages.files + ' to ' + paths.pages.dest);

   gulp.src(paths.webparts.files).pipe(gulp.dest(paths.webparts.dest));
   console.log('Copied ' + paths.webparts.files + ' to ' + paths.webparts.dest);
});

gulp.task('uglify', function() {
  return gulp.src(paths.scripts.files)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('useref', function(){
   return gulp.src('./dev/*.html')
           .pipe(useref())
           .pipe(gulpIf('*.js', uglify()))
           .pipe(gulpIf('*.css', cssnano()))
           .pipe(gulp.dest('./public_html'));
});

gulp.task('manifest', function(){
    var sitefiles = paths.folders.sitefiles + '/**/*';
    console.log('Getting manifest files from: ' + sitefiles);
    gulp.src([sitefiles])
    .pipe(manifest({
        relativePath: '/sitefiles',
        hash: true,
        timestamp: false,
        preferOnline: false,
        network: ['http://*', 'https://*', '*'],
        filename: 'app.appcache',
        fallback : ['/pages/ /offline.html'],
        exclude: ['app.appcache']
     }))
    .on('error', function(err){
        displayError(err);
    })
    .pipe(gulp.dest(paths.folders.root));
});

gulp.task('inject', function(){
  gulp.src('./dev/**/*.html')
  .pipe(inject(
    gulp.src(paths.angular.files)
      .pipe(angularFilesort()), {relative: true}
    ))
  .pipe(gulp.dest('./dev'));
});

gulp.task('build', function(callback){
   runSeq('sass', 'clean:dist', ['copy:dev', 'useref'], 'manifest', callback);
});

gulp.task('watch', ['sass', 'inject'], function(){
   gulp.watch(paths.styles.files, ['sass']);
});

gulp.task('default', function (callback) {
    runSeq('sass', 'clean:dist', 'copy:dev', 'useref', 'manifest', callback);
});
