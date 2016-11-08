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

var fs = require('fs')
var sql_data = require('./sql_task_helpers.js')
var global_data = {
  Absences: sql_data['Absences'],
  Absences_Excused: sql_data['Absences_Excused'],
  Early_Arrivals: sql_data['Early_Arrivals'],
  Early_Arrivals_Excused: sql_data['Early_Arrivals_Excused'],
  Late_Arrivals: sql_data['Late_Arrivals'],
  Late_Arrivals_Excused: sql_data['Late_Arrivals_Excused']
}
var locals_data_file = './tmp/data.json'

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', function () {
  return destDir.dirAsync('.', { empty: true })
})

// -------------------------------------
// Get Global Data & write to file
// -------------------------------------

var set_globals = function () {
  return global_data
}

gulp.task('set_globals', ['clean'], set_globals)

// -------------------------------------

var copyTask = function () {
  return projectDir.copyAsync('app', destDir.path(), {
    overwrite: true,
    matching: paths.copyFromAppDir
  })
}
gulp.task('copy', ['set_globals'], copyTask)
gulp.task('copy-watch', ['set_globals'], copyTask)

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
gulp.task('bundle', ['set_globals'], bundleTask)
gulp.task('bundle-watch', ['set_globals'], bundleTask)

// ---PUG---------------------------------

var indexTask = function buildHTML () {
  return gulp.src('app/app.pug')
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(plumber())
    .pipe(data(function (file) {
      return JSON.parse(fs.readFileSync(locals_data_file))
    }))
    .pipe(pug({
      pretty: true,
      basedir: __dirname
    }))
    .pipe(gulp.dest(destDir.path('./')))
}
gulp.task('index', ['set_globals'], indexTask)
gulp.task('index-watch', ['set_globals'], indexTask)

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
gulp.task('views', ['set_globals'], viewsTask)
gulp.task('views-watch', ['set_globals'], viewsTask)

// ---------------------------------------

// ---CSS---------------------------------

var stylesTask = function buildHTML () {
  return gulp.src('app/styles/**/*.css')
    .pipe(plumber())
    .pipe(gulp.dest(destDir.path('styles')))
}
gulp.task('styles', ['set_globals'], stylesTask)
gulp.task('styles-watch', ['set_globals'], stylesTask)

// ---------------------------------------

gulp.task('environment', ['set_globals'], function () {
  var configFile = 'config/env_' + utils.getEnvName() + '.json'
  projectDir.copy(configFile, destDir.path('env.json'))
})

gulp.task('package-json', ['set_globals'], function () {
  var manifest = srcDir.read('package.json', 'json')

  // Add "dev" suffix to name, so Electron will write all data like cookies
  // and localStorage in separate places for production and development.
  if (utils.getEnvName() === 'development') {
    manifest.name += '-dev'
    manifest.productName += ' Dev'
  }

  destDir.write('package.json', manifest)
})

gulp.task('watch', ['set_globals'], function () {
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

gulp.task('build', ['set_globals', 'bundle', 'index', 'views', 'styles', 'copy', 'environment', 'package-json'])
