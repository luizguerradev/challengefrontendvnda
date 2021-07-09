const gulp = require('gulp'),
      sass = require('gulp-sass'),
      minify = require('gulp-minify');
  
var   concat = require('gulp-concat'),
      htmlmin = require('gulp-htmlmin');

sass.compiler = require('node-sass');


      function watch() {
        gulp.
        watch("./src/*.html", compressHTML);
        gulp
        .watch("./src/sass/*.scss", compressSass);
        gulp
        .watch("./src/js/*.js", compressJS);
      }
      
function compressHTML() {
   return gulp
     .src("./src/*.html")
     .pipe(htmlmin({ collapseWhitespace: true }))
     .pipe(gulp.dest("./dist"));
}

function compressSass() {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(sass({ outputStyle: "COMPILADO" }).on("Deu ruim", sass.logError))
    .pipe(gulp.dest("./dist/css"));
}


function compressJS() {
  return gulp
    .src('src/js/**/*.js')
    .pipe(concat('index.min.js'))
    .pipe(
      minify({
        mangle: {
          keepClassName: true,
        },
     })
    )
    .pipe(gulp.dest('dist/js'));
}


