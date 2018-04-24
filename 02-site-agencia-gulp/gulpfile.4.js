const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src('dist')
               . pipe(clean() );
});

gulp.task('copy', ['clean'] ,  function() {

   return gulp.src('src/imagens/**/*')
              .pipe(gulp.dest('dist/imagens') );
});


gulp.task('build-img', ['copy'],  function() {
    gulp.src('dist/imagens/**/*')
        .pipe(imagemin() )
        .pipe(gulp.dest('dist/imagens') );

});


