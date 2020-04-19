const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const concatcss = require('gulp-concat-css');
const cssnano = require('cssnano');
const {
    DESTINATION,
    SOURCE,
    TARGET_BROWSERS,
    TASKS,
    WATCH_FILES
} = require('./constants');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const include = require('gulp-include');
const { Logger } = require('mosaic-logger');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task(TASKS.CSS, () => gulp.src(SOURCE.CSS)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer(TARGET_BROWSERS))
    .pipe(concatcss(DESTINATION.VENDOR_CSS))
    .pipe(postcss([cssnano()]))
    .pipe(sourcemaps.write(DESTINATION.SOURCE_MAPS))
    .pipe(gulp.dest(DESTINATION.DIRECTORY))
);

gulp.task(TASKS.HTML, () => gulp.src(SOURCE.HTML)
    .pipe(include())
    .on('error', Logger.error)
    .pipe(htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true
    }))
    .pipe(gulp.dest(DESTINATION.DIRECTORY))
);

gulp.task(TASKS.JAVASCRIPT, () => gulp.src(SOURCE.JAVASCRIPT)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(concat(DESTINATION.JAVASCRIPT))
    .pipe(sourcemaps.write(DESTINATION.SOURCE_MAPS))
    .pipe(gulp.dest(DESTINATION.DIRECTORY))
);

gulp.task(TASKS.SASS, () => gulp.src(SOURCE.SASS)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(TARGET_BROWSERS))
    .pipe(concatcss(DESTINATION.CSS))
    .pipe(postcss([cssnano()]))
    .pipe(sourcemaps.write(DESTINATION.SOURCE_MAPS))
    .pipe(gulp.dest(DESTINATION.DIRECTORY))
);

gulp.task(TASKS.STATIC, () => {
    return gulp.src(SOURCE.STATIC).pipe(gulp.dest(`${__dirname}/${DESTINATION.DIRECTORY}`));
});

gulp.task(TASKS.WATCH, () => {
    gulp.watch(SOURCE.CSS, gulp.series([TASKS.CSS]));
    gulp.watch(SOURCE.HTML, gulp.series([TASKS.HTML]));
    gulp.watch(SOURCE.STATIC, gulp.series([TASKS.STATIC]));
    gulp.watch(SOURCE.TEMPLATES, gulp.series([TASKS.HTML]));
    gulp.watch(WATCH_FILES.SASS, gulp.series([TASKS.SASS]));
    gulp.watch(WATCH_FILES.JAVASCRIPT, gulp.series([TASKS.JAVASCRIPT]));
});

gulp.task(TASKS.BUILD, gulp.series([
    TASKS.CSS,
    TASKS.HTML,
    TASKS.JAVASCRIPT,
    TASKS.SASS,
    TASKS.STATIC
]));

gulp.task(TASKS.DEFAULT, gulp.series([TASKS.BUILD, TASKS.WATCH]));