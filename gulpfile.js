const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const tslint = require('gulp-tslint');

const path = {
    src: 'src/**/*.ts',
    dist: 'dist/',
    module: 'node_modules/swagger-express-ts',
    lib: {
        src: 'lib/swagger-express-ts-lib/src/**/*.ts',
    },
};

function cleanAll() {
    return gulp
        .src(['dist', path.module, '.nyc_output', 'coverage', '*.log*'], {
            read: false,
            allowEmpty: true,
        })
        .pipe(clean());
}

function buildLib() {
    var tsProjectLib = ts.createProject('tsconfig.lib.json', {});
    return gulp
        .src([path.lib.src])
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(tsProjectLib())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.dist));
}

function buildModule() {
    var tsProjectModule = ts.createProject('tsconfig.dev.lib.json', {});
    return (
        gulp
            .src([path.lib.src])
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(tsProjectModule())
            //.on ("error", function (err) {
            //    process.exit (1);
            //})
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(path.module))
    );
}

function copyFilesInDist() {
    return gulp
        .src([
            './README.md',
            './LICENSE',
            './CHANGELOG.md',
            './lib/swagger-express-ts-lib/package.json',
        ])
        .pipe(gulp.dest(path.dist));
}

function tsLint() {
    return gulp.src([path.src, path.lib.src]).pipe(
        tslint({
            formatter: 'verbose',
            fix: true,
        })
    );
    // .pipe(tslint.report())
    // .pipe(
    //     tslintReporter({
    //         sort: true,
    //         filename: 'reports/checkstyle/results.xml',
    //         severity: 'error',
    //     })
    // );
}
gulp.task('tslint', tsLint);
gulp.task('clean', cleanAll);
gulp.task('build:lib', gulp.series('clean', buildLib, copyFilesInDist));
gulp.task('build', gulp.series('clean', 'tslint', buildModule));
