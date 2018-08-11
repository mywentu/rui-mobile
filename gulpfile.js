const gulp = require('gulp')
const sass = require('gulp-sass') // 相对于gulp-ruby-sass 不需要额外的ruby环境
const sassGlob = require('gulp-sass-glob')
const autoprefixer = require('gulp-autoprefixer');
const minifyCss = require('gulp-minify-css')
const rename = require('gulp-rename')
const shell = require('gulp-shell');
const browserSync = require('browser-sync');

gulp.task('kss', shell.task(
  ['./node_modules/.bin/kss --config kss-config.json']))


gulp.task('css', () => 
  gulp.src('src/sass/rui.scss')
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 100 versions'], // http://browserl.ist/?q=last+4+versions
    cascade: true, //是否美化属性值
    remove:true //是否去掉不必要的前缀
  }))
  .pipe(minifyCss())
  .pipe(rename({suffix: '.min'}))
  // .pipe(gulprev()) // 追加md5
  .pipe(gulp.dest('dist/css'))  
)

gulp.task('browserSync', function() {
  browserSync({
    startPath: 'index.html',
    server: {
      baseDir: ['docs', 'dist']
    }
  })
})

gulp.task('build', ['css', ])

gulp.task('default', ['css'], function() {
  gulp.watch('src/*/*', ['css'])
  gulp.watch('docs/*.html', browserSync.reload)
})