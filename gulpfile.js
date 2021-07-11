const gulp = require("gulp");
const gulpSass = require('gulp-sass');
const nodeSass = require('node-sass');

const sass = gulpSass(nodeSass);
const minify = require("gulp-babel-minify");
const imagemin = require("gulp-imagemin");

var htmlmin = require("gulp-htmlmin");
var concat = require("gulp-concat");
var notify = require("gulp-notify");

function watch() {
  gulp.watch("./src/sass/*.scss", compressSass);
  gulp.watch("./src/js/*.js", compressJS);
  gulp.watch("./src/*.html", compressHTML);
  gulp.watch("./src/img/**/*", compressIMG);
}

function compressSass() {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(sass({ outputStyle: "ok" }).on("Deu ruim", sass.logError))
    .pipe(gulp.dest("dist/css"));
}

function compressJS() {
  return gulp
    .src("./src/js/*.js")
    .pipe(concat("index.min.js"))
    .pipe(
      minify({
        mangle: {
          keepClassName: true,
        },
      })
    )
    .pipe(gulp.dest("./dist/js"));
}

function compressHTML() {
  return gulp
    .src("./src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"));
}

function compressIMG(){
  return gulp
  .src("./src/img/**/*")
  .pipe(imagemin())
  .on("error", notify.onError("Error:<%= error.message %>"))
  .pipe(gulp.dest("./dist/img"));  
}

gulp.task("Sass", compressSass)
gulp.task("default", watch)