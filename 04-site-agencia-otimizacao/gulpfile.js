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

// +++++++++++++++++++++++++++++++++++++++++++++++++++


/* ------------------ Minificações ------------- */
gulp.task('minify-js', function() {
    return gulp.src('src/**/*.js')
      .pipe($.uglify())
      .pipe(gulp.dest('dist/'))
  });
  
  gulp.task('minify-css', function() {
    return gulp.src('src/**/*.css')
      .pipe($.cssnano({safe: true}))
      .pipe(gulp.dest('dist/'))
  });
  
  gulp.task('minify-html', function() {
    return gulp.src('src/**/*.html')
      .pipe($.htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist/'))
  });
  

/* Concatenação */
gulp.task('useref', function () {
    return gulp.src('src/index.html')
        .pipe($.useref())
        .pipe($.if('*.html', $.inlineSource()))
        .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano({safe: true})))
        .pipe(gulp.dest('dist'));
});


/* Imagens */
gulp.task('imagemin', function() {
    return gulp.src('site/assets/img/*')
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        .pipe(gulp.dest('dist/assets/img'));
});


/* Revisão de arquivos */
gulp.task('rev', function(){
  return gulp.src(['dist/**/*.{css,js,jpg,jpeg,png,svg}'])
    .pipe($.rev())
    .pipe($.revdel())
    .pipe(gulp.dest('dist/'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('dist/'))
})

gulp.task('revreplace', ['rev'], function(){
  return gulp.src(['dist/index.html', 'dist/app.yaml', 'dist/**/*.css'])
    .pipe($.revReplace({
        manifest: gulp.src('dist/rev-manifest.json'),
        replaceInExtensions: ['.html', '.yaml', '.js', '.css']
    }))
    .pipe(gulp.dest('dist/'));
});


/* Alias */
gulp.task('minify', ['minify-js', 'minify-css', 'minify-html']);
gulp.task('build', $.sequence(['minify-js', 'minify-css', 'imagemin'], 'useref', 'revreplace'));
gulp.task('default', $.sequence('clean', 'copy', 'build'));


/* --- ferramentas para auxiliar o desenvolvedor --- */

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


 /* monitorar erros em arquivos css */
gulp.task('css-observer', function() {
  gulp.src('src/css/*.css')
    .pipe(csslint() )
    .pipe(csslint.formatter() );
});


 


