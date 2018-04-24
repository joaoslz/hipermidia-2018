
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');


gulp.task('copy', function() {

    gulp.src('src/imagens/**/*')
    .pipe(gulp.dest('dist') );
});


gulp.task('build-img', function() {
    gulp.src('src/imagens/**/*')
        .pipe(imagemin() )
        .pipe(gulp.dest('dist/imagens') );

});

