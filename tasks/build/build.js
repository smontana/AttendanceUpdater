'use strict'

var pathUtil = require('path')
var Q = require('q')
var gulp = require('gulp')
var data = require('gulp-data')
var rename = require('gulp-rename')
var pug = require('gulp-pug')
var watch = require('gulp-watch')
var batch = require('gulp-batch')
var plumber = require('gulp-plumber')
var jetpack = require('fs-jetpack')

var bundle = require('./bundle')
var generateSpecImportsFile = require('./generate_spec_imports')
var utils = require('../utils')

var projectDir = jetpack
var srcDir = projectDir.cwd('./app')
var destDir = projectDir.cwd('./build')
var fs = require('fs')

var paths = {
  copyFromAppDir: [
    './node_modules/**',
    './lib/**',
    './main-process/**',
    './renderer-process/**',
    './assets/**',
    './styles/**',
    './views/**',
    './**/*.html',
    './**/*.+(jpg|png|svg)'
  ]
}

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', function () {
  return destDir.dirAsync('.', { empty: true })
})

// -------------------------------------

var copyTask = function () {
  return projectDir.copyAsync('app', destDir.path(), {
    overwrite: true,
    matching: paths.copyFromAppDir
  })
}
gulp.task('copy', ['clean'], copyTask)
gulp.task('copy-watch', copyTask)

var bundleApplication = function () {
  return Q.all([
    bundle(srcDir.path('background.js'), destDir.path('background.js')),
    bundle(srcDir.path('app.js'), destDir.path('app.js'))
  ])
}

var bundleSpecs = function () {
  return generateSpecImportsFile().then(function (specEntryPointPath) {
    return bundle(specEntryPointPath, destDir.path('spec.js'))
  })
}

var bundleTask = function () {
  if (utils.getEnvName() === 'test') {
    return bundleSpecs()
  }
  return bundleApplication()
}
gulp.task('bundle', ['clean'], bundleTask)
gulp.task('bundle-watch', bundleTask)

// ---PUG---------------------------------

var indexTask = function buildHTML () {
  return gulp.src('app/app.pug')
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(plumber())
    .pipe(pug({
      pretty: true,
      basedir: __dirname
    }))
    .pipe(gulp.dest(destDir.path('./')))
}
gulp.task('index', ['clean'], indexTask)
gulp.task('index-watch', indexTask)

var viewsTask = function buildHTML () {
  return gulp.src('app/views/**/*.pug')
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(plumber())
    .pipe(pug({
      pretty: true,
      basedir: __dirname + '/views/'
    }))
    .pipe(gulp.dest(destDir.path('views')))
}
gulp.task('views', ['clean'], viewsTask)
gulp.task('views-watch', viewsTask)

// ---------------------------------------

// ---CSS---------------------------------

var stylesTask = function buildHTML () {
  return gulp.src('app/styles/**/*.css')
    .pipe(plumber())
    .pipe(gulp.dest(destDir.path('styles')))
}
gulp.task('styles', ['clean'], stylesTask)
gulp.task('styles-watch', stylesTask)

// ---------------------------------------

gulp.task('environment', ['clean'], function () {
  var configFile = 'config/env_' + utils.getEnvName() + '.json'
  projectDir.copy(configFile, destDir.path('env.json'))
})

gulp.task('package-json', ['clean'], function () {
  var manifest = srcDir.read('package.json', 'json')

  // Add "dev" suffix to name, so Electron will write all data like cookies
  // and localStorage in separate places for production and development.
  if (utils.getEnvName() === 'development') {
    manifest.name += '-dev'
    manifest.productName += ' Dev'
  }

  destDir.write('package.json', manifest)
})

gulp.task('watch', ['clean'], function () {
  watch('app/**/*.js', batch(function (events, done) {
    gulp.start('bundle-watch', done)
  }))
  watch(paths.copyFromAppDir, { cwd: 'app' }, batch(function (events, done) {
    gulp.start('copy-watch', done)
  }))
  watch('app/app.pug', batch(function (events, done) {
    gulp.start('index-watch', done)
  }))
  watch('app/views/**/*.pug', batch(function (events, done) {
    gulp.start('views-watch', done)
  }))
  watch('app/styles/**/*.css', batch(function (events, done) {
    gulp.start('styles-watch', done)
  }))
})

gulp.task('build', ['bundle', 'index', 'views', 'styles', 'copy', 'environment', 'package-json'])
