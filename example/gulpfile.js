/*global require*/
/* Require the gulp and node packages */
var gulp = require('gulp'),
    pkg = require('./package.json'),
    header = require('gulp-header'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    debug = require('gulp-debug'),
    browserify = require('gulp-browserify'),
    runSequence = require('run-sequence');


/* Set up the banner */
var banner = [
    '/**',
    ' * @name <%= pkg.name %>: <%= pkg.description %>',
    ' * @version <%= pkg.version %>: <%= new Date().toUTCString() %>',
    ' * @author <%= pkg.author %>',
    ' * @license <%= pkg.license %>',
    ' */'
].join('\n');

/* Error notificaton*/
var onError = function(err) {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
        sound:    "Beep"
    })(err);

    this.emit('end');
};

/************************
 *  Task definitions 
 ************************/
/* Concat the js */
gulp.task('js', function() {
    return gulp.src('src/app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : true
        }))
		.pipe(header(banner, {pkg : pkg}))
		.pipe(gulp.dest('dist/js'));
});

/* Server with auto reload and browersync */
gulp.task('server', ['js'], function () {
      browserSync({
        notify: false,
        // https: true,
        server: ['dist'],
        tunnel: true
      });

      gulp.watch(['src/js/*'], ['js', reload]);
});

/************************
 *  Task collection API
 ************************/
gulp.task('default', ['js']);
gulp.task('serve', ['server']);


