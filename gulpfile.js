var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');

var path = {
    src: 'src',
    built: 'built',
    dist: 'dist/swagger-express-ts',
    module: 'node_modules/swagger-express-ts',
    lib: {
        src: 'lib/swagger-express-ts-lib/src/**/*.ts',
    },
    app: {
        src: 'src/**/*.ts',
        built: 'built/**/*.js',
    },
};

gulp.task('clean:module', function() {
    return gulp.src([path.module]).pipe(clean());
});

gulp.task('clean:dist', function() {
    return gulp.src(['dist']).pipe(clean());
});

gulp.task('clean:built', function() {
    return gulp.src([path.built]).pipe(clean());
});

gulp.task('clean', ['clean:built', 'clean:dist'], function() {
    return gulp.src(['coverage']).pipe(clean());
});

var tsProjectApp = ts.createProject('tsconfig.json', {});
gulp.task('build:app', ['clean:built', 'build:module'], function() {
    console.info('Compiling files .ts...');
    return (
        gulp
            .src([path.app.src])
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(tsProjectApp())
            //.on ("error", function (err) {
            //    process.exit (1);
            //})
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('built'))
    );
});

var tsProjectLib = ts.createProject('tsconfig.lib.json', {});
gulp.task('build:lib', ['clean:dist', 'copy:files'], function() {
    console.info('Compiling files .ts...');
    return (
        gulp
            .src([path.lib.src])
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(tsProjectLib())
            //.on ("error", function (err) {
            //    process.exit (1);
            //})
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(path.dist))
    );
});

var tsProjectModule = ts.createProject('tsconfig.dev.lib.json', {});
gulp.task('build:module', ['clean:module'], function() {
    console.info('Compiling files .ts...');
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
});

gulp.task('copy:files', function() {
    return gulp
        .src([
            './README.md',
            './LICENSE',
            './CHANGELOG.md',
            './lib/swagger-express-ts-lib/package.json',
        ])
        .pipe(gulp.dest(path.dist));
});

gulp.task('watch', function() {
    gulp.watch(path.app.src, ['build']);
    gulp.watch(path.lib.src, ['build']);
});

gulp.task('build', ['build:app']);
gulp.task('dev', ['build', 'watch'], function() {
    nodemon({
        script: 'built/main.js',
        ext: 'js',
        ignore: ['node_modules/', 'config/', 'src', 'dist'],
    })
        .on('start', function() {
            console.info('nodemon has started app');
        })
        .on('quit', function() {
            console.info('nodedmon has quit');
            process.exit();
        })
        .on('restart', function(files) {
            console.info('App restarted due to: ', files);
        });
});
