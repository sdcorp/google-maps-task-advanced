var gulp        = require('gulp');
var bs = require('browser-sync').create();
var reload      = bs.reload;

var paths = {
    html: '*.html',
    scripts: 'js/**/*.js',
  };

gulp.task('b-sync', function () {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watcher', function () { 
    gulp.watch(paths.html).on('change', reload);
    gulp.watch(paths.scripts).on('change', reload);
})

gulp.task('default', gulp.parallel('watcher', 'b-sync'));

