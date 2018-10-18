var gulp = require('gulp')
var ts = require('gulp-typescript')
var nodemon = require('gulp-nodemon')
var sourcemaps = require('gulp-sourcemaps')

var path = {
    src: 'src',
    built: 'built',
    app: {
        src: 'src/**/*.ts',
        built: 'built/**/*.js',
    },
}

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript'),
})
gulp.task('build:ts', function() {
    console.info('Compiling files .ts...')
    return (
        gulp
            .src([path.app.src])
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(tsProject())
            //.on ("error", function (err) {
            //    process.exit (1);
            //})
            .js.pipe(sourcemaps.write('../'.concat(path.built)))
            .pipe(gulp.dest('built'))
    )
})

gulp.task('watch', function() {
    gulp.watch(path.app.src, ['build'])
})

gulp.task('build', ['build:ts'])
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
