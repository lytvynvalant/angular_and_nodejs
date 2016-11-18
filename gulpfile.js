var gulp = require('gulp'),
    connect = require('gulp-connect');

var path = {
    'all': './public/**/*.*'
};

gulp.task('connect', function () {
    connect.server({
        root: './public',
        port: 8000,
        livereload: true
    });
});

gulp.task('watch:all', function(){
    gulp.src(path.all)
        .pipe(connect.reload())
});

gulp.task('livereload',["watch:all"], function () {
    gulp.watch(path.all, ['watch:all']);
});

gulp.task('default', ['connect', 'livereload']);
