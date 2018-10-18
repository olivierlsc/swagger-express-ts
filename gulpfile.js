var gulp = require('gulp')
var ts = require('gulp-typescript')
var nodemon = require('gulp-nodemon')
var sourcemaps = require('gulp-sourcemaps')

var path = {
    src: 'src',
    built: 'built',
    dist: 'dist/swagger-express-ts',
    lib: {
        src: 'lib/swagger-express-ts-lib/src/**/*.ts',
    },
    app: {
        src: 'src/**/*.ts',
        built: 'built/**/*.js',
    },
}

var tsProjectApp = ts.createProject('tsconfig.json', {
    declaration: true,
})
gulp.task('build:app', function() {
    console.info('Compiling files .ts...')
    return (
        gulp
            .src([path.app.src])
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(tsProjectApp())
            //.on ("error", function (err) {
            //    process.exit (1);
            //})
            .js.pipe(sourcemaps.write('../'.concat(path.built)))
            .pipe(gulp.dest('built'))
    )
})

var tsProjectLib = ts.createProject('tsconfig.package.json', {
    declaration: true,
})
gulp.task('build:lib', ['copy:files'], function() {
    console.info('Compiling files .ts...')
    return (
        gulp
            .src([path.lib.src])
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(tsProjectLib())
            //.on ("error", function (err) {
            //    process.exit (1);
            //})
            .js.pipe(sourcemaps.write('../'.concat(path.dist)))
            .pipe(gulp.dest(path.dist))
    )
})

gulp.task('copy:files', function() {
    return gulp
        .src(['./README.md', './LICENSE', './CHANGELOG.md', './lib/swagger-express-ts-lib/package.json'])
        .pipe(gulp.dest(path.dist))
})

gulp.task('watch', function() {
    gulp.watch(path.app.src, ['build'])
    gulp.watch(path.lib.src, ['build'])
})

gulp.task('build', ['build:app', 'build:lib'])
gulp.task('dev', ['build', 'watch'], function() {
    nodemon({
        script: 'built/main.js',
        ext: 'js',
        ignore: ['node_modules/', 'config/', 'src'],
    })
        .on('start', function() {
            console.info('nodemon has started app')
        })
        .on('quit', function() {
            console.info('nodedmon has quit')
            process.exit()
        })
        .on('restart', function(files) {
            console.info('App restarted due to: ', files)
        })
})
