'use strict';

const gulp = require('gulp');
const del = require('del');
const browserify = require('gulp-browserify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const karma = require('karma');

gulp.task('clean', [], () => {
    return del(['dist']);
});

gulp.task('build', ['clean'], () => {
    return Promise.all([
        new Promise((resolve, reject) => {
            gulp
                .src('src/index.js')
                .pipe(browserify())
                .pipe(concat('bundle.js'))
                .pipe(gulp.dest('dist'))
                .on('end', resolve);
        }),
        new Promise((resolve, reject) => {
            gulp
                .src('src/**/*.html')
                .pipe(gulp.dest('dist'))
                .on('end', resolve);
        })
    ]);
});

gulp.task('dev', ['build'], () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    return gulp.watch('./src/**/*.*').on('change', () => {
        runSequence(
            'build',
            () => {
                browserSync.reload();
            }
        );
    });
});

/**
 * This is a workaround to avoid the node process sometimes hanging after gulp karma tasks have finished
 * https://github.com/karma-runner/karma/issues/1035
 * https://github.com/karma-runner/gulp-karma/issues/38
 */
function handleKarmaExit(exitCode, done) {
    if (exitCode === 0 || exitCode === null || typeof exitCode === 'undefined') {
        done();
    } else {
        done(new Error('Karma exited with code ' + exitCode));
    }
    process.exit(exitCode);
}

/***
 * Run tests in the console
 */
gulp.task('test', [], (done) => {
    new karma.Server(
        {
            configFile: __dirname + '/karma.conf.js'
        },
        (exitCode) => {
            handleKarmaExit(exitCode, done);
        }
    ).start();
});

/**
 * Develop/Debug tests in a browser
 */
gulp.task('test-browser', [], (done) => {
    new karma.Server(
        {
            configFile: __dirname + '/karma.conf.js',
            singleRun: false,
            browsers: ['Chrome'],
            client: {
                mocha: {
                    timeout : 0
                }
            },
            browserNoActivityTimeout: 0
        },
        (exitCode) => {
            handleKarmaExit(exitCode, done);
        }
    ).start();
});
