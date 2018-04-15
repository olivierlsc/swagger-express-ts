var gulp = require("gulp");
var clean = require("gulp-clean");
var ts = require("gulp-typescript");
var nodemon = require("gulp-nodemon");
var sourcemaps = require("gulp-sourcemaps");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");
require("mocha-jenkins-reporter");
var tslint = require("gulp-tslint");
var tslintReporter = require("gulp-tslint-jenkins-reporter");
var prettierPlugin = require("gulp-prettier-plugin");

var path = {
  built: "built",
  dist: "dist",
  reports: "reports",
  app: {
    src: "src/**/*.ts",
    built: "built/**/*.ts"
  }
};

gulp.task("clean", function() {
  return gulp
    .src([path.built, path.dist, path.reports, "src/**/*.js"])
    .pipe(clean({ force: true }));
});

gulp.task("prettier", function() {
  return (
    gulp
      .src([path.app.src])
      .pipe(prettierPlugin(undefined, { filter: true }))
      // passing a function that returns base will write the files in-place
      .pipe(
        gulp.dest(function(file) {
          return file.base;
        })
      )
  );
});

gulp.task("copy:src", ["clean"], function() {
  return gulp.src([path.app.src]).pipe(gulp.dest(path.built));
});

var tsProject = ts.createProject("tsconfig.json", { typescript: require("typescript") });
gulp.task("build:ts", ["prettier", "copy:src"], function() {
  console.info("Compiling files .ts...");
  return (
    gulp
      .src([path.app.src])
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(tsProject())
      //.on ("error", function (err) {
      //    process.exit (1);
      //})
      .js.pipe(sourcemaps.write("../".concat(path.built)))
      .pipe(gulp.dest(path.built))
  );
});

gulp.task("tslint", function() {
  gulp
    .src(path.app.src)
    .pipe(
      tslint({
        formatter: "verbose"
      })
    )
    .pipe(tslint.report())
    .pipe(
      tslintReporter({
        sort: true,
        filename: "reports/checkstyle/results.xml",
        severity: "error"
      })
    );
});

gulp.task("pre-test", ["build:ts"], function() {
  gulp
    .src([path.built + "/**/*.spec.js"])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task("test:coverage", ["pre-test"], function() {
  gulp
    .src([path.built])
    .pipe(
      mocha({
        reporter: "mocha-jenkins-reporter",
        reporterOptions: {
          junit_report_name: "Tests",
          junit_report_path: "reports/junit/results.xml",
          junit_report_stack: 1
        }
      })
    )
    // Creating the reports after tests ran
    .pipe(
      istanbul.writeReports({
        dir: "./coverage",
        reporters: ["text", "text-summary", "cobertura", "html"],
        reportOpts: { dir: "./reports/coverage" }
      })
    )
    // Enforce a coverage of at least 90%
    .pipe(
      istanbul.enforceThresholds({ thresholds: { global: { lines: 80 }, each: { lines: 80 } } })
    );
});

gulp.task("test", ["build:ts"], function() {
  gulp
    .src(path.built + "/**/*.spec.js", { read: false })
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(
      mocha({
        reporter: "mocha-jenkins-reporter",
        reporterOptions: {
          junit_report_name: "Tests",
          junit_report_path: "reports/junit/results.xml",
          junit_report_stack: 1
        }
      })
    );
});

gulp.task("watch", function() {
  gulp.watch(path.app.src, ["prettier", "build"]);
});

gulp.task("build", ["clean", "copy:src", "build:ts"]);
gulp.task("dev", ["build", "watch"], function() {
  return nodemon({
    script: "built/main.js",
    //ext: 'js',
    watch: "built/main.js",
    ignore: ["node_modules/", "config/", "src"]
  }).on("restart", function() {
    console.log("restarted!");
  });
});
