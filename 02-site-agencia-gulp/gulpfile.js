const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const csslint = require('gulp-csslint');

gulp.task('default', ['copy'], function() {
    gulp.start('build-img', 'merge-css', 'html-replace' );
})

gulp.task('clean', function() {
    return gulp.src('dist')
               . pipe(clean() );
});

gulp.task('copy', ['clean'] ,  function() {

   return gulp.src('src/**/*')
              .pipe(gulp.dest('dist') );
});


gulp.task('build-img',  function() {
    gulp.src('dist/imagens/**/*')
        .pipe(imagemin() )
        .pipe(gulp.dest('dist/imagens') );

});

gulp.task('merge-css', function() {
    gulp.src(['dist/css/normalize.css',
              'dist/css/global.css',
              'dist/css/wrappers.css',
              'dist/css/barra-superior.css',
              'dist/css/botoes.css',
              'dist/css/cabecalho.css',
              'dist/css/secoes.css',
              'dist/css/grid.css',
              'dist/css/rodape.css' ])
        .pipe(concat('site.css') )
        .pipe(cleanCSS() )
        .pipe(gulp.dest('dist/css') );
 });

 gulp.task('html-replace', function() {
    gulp.src('src/**/*.html')
    .pipe(htmlReplace({css:'css/site.css'}) )
    .pipe(gulp.dest('dist') );
 });


 /* browser sync */
 gulp.task('browser-sync', function() {
     browserSync.init({
         server: {
             baseDir: 'src'
         }
     });
     gulp.watch('src/**/*')
         .on('change',  browserSync.reload );        

 });

  
 //     gulp.watch('src/**/*')
 //     .on('change',  function() {
 //       browserSync.reload();
 //      });        

 
 /* monitorar erros em arquivos css */
gulp.task('css-observer', function() {
  gulp.src('src/css/*.css')
    .pipe(csslint() )
    .pipe(csslint.formatter() );
});


 


