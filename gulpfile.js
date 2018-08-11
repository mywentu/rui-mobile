const gulp = require('gulp')
const sass = require('gulp-sass') // 相对于gulp-ruby-sass 不需要额外的ruby环境
const sassGlob = require('gulp-sass-glob')
const autoprefixer = require('gulp-autoprefixer');
const minifyCss = require('gulp-minify-css')
const rename = require('gulp-rename')
// const gulprev = require('gulp-rev'); 
var kss = require('gulp-kss');    

gulp.task('css', () => 
  gulp.src('sass/rui.scss')
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

gulp.task('styleguide', function () {
  gulp.src(['sass/rui.scss'])
      .pipe(kss({
          overview: 'sass/styleguide.md',
          templateDirectory: __dirname + '/template/michelangelo'
      }))
      .pipe(gulp.dest('docs/'))
})

gulp.task('watch', function() {
  gulp.watch(['sass/**/*.scss', 'sass/mixins/**/*.scss'], ['css'])
})

gulp.task('default', ['css', 'styleguide'])