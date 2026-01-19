const { series, src, parallel } = require('gulp')
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer').default
const cleanCSS = require('gulp-clean-css')

const style_path = './src/styles/main.scss'
const html_path = './src/html/**'
const img_path = './src/images/**'
const js_path = './src/js/**/*.js'


function cssBuild(cb) {
  // body omitted
  return src(style_path, { allowEmpty: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'));

  cb();
}


const build = series(cssBuild)
exports.default = build;