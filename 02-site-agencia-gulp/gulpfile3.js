const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');



gulp.task('copy', function() {

    gulp.src('src/imagens/**/*')
        .pipe(gulp.dest('dist') );
});


gulp.task('clean', function() {
   return gulp.src('dist')
              . pipe(clean() );

});

gulp.task('build-img', ['clean'],  function() {
    gulp.src('src/imagens/**/*')
        .pipe(imagemin() )
        .pipe(gulp.dest('dist/imagens') );

});


