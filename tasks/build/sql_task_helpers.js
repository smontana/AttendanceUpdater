require('dotenv').load()
var sql = require('seriate')
var _ = require('lodash')
var Q = require('q')
var env = process.env.ENV

var db_config = {
  name: 'default',
  user: process.env.DB_UN,
  password: process.env.DB_PW,
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME
}

var default_queries = {
  get_absences_dms: 'EmployeeServices.dbo.get_absences_dms',
  get_absences_dms_excused: 'EmployeeServices.dbo.get_absences_dms_excused',
  get_earlies_dms: 'EmployeeServices.dbo.get_earlies_dms',
  get_earlies_dms_excused: 'EmployeeServices.dbo.get_earlies_dms_excused',
  get_lates_dms: 'EmployeeServices.dbo.get_lates_dms',
  get_lates_dms_excused: 'EmployeeServices.dbo.get_lates_dms_excused'
}

var abs_arr = []
var abs_arr_excused = []
var early_arr = []
var early_arr_excused = []
var late_arr = []
var late_arr_excused = []

var sql_data = {}

function set_default_config () {
  var deferred = Q.defer()
  var sql = require('seriate')

  sql.setDefault(db_config)

  console.log('------SQL DEFAULT CONFIG SET------')
  deferred.resolve()
  return deferred.promise
}

function get_absences (id) {
  var deferred = Q.defer()

  sql.execute({
    query: 'EmployeeServices.dbo.get_absences_dms'
  }).then(function (data) {
    abs_arr = data

    deferred.resolve(1)
  }, function (err) {
    console.log(err)
  })

  return deferred.promise
}

function get_absences_excused (id) {
  var deferred = Q.defer()

  sql.execute({
    query: 'EmployeeServices.dbo.get_absences_dms_excused'
  }).then(function (data) {
    abs_arr_excused = data

    deferred.resolve(2)
  }, function (err) {
    console.log(err)
  })

  return deferred.promise
}

function get_earlies (id) {
  var deferred = Q.defer()

  sql.execute({
    query: 'EmployeeServices.dbo.get_earlies_dms'
  }).then(function (data) {
    early_arr = data

    deferred.resolve(3)
  }, function (err) {
    console.log(err)
  })

  return deferred.promise
}

function get_earlies_excused (id) {
  var deferred = Q.defer()

  sql.execute({
    query: 'EmployeeServices.dbo.get_earlies_dms_excused'
  }).then(function (data) {
    early_arr_excused = data

    deferred.resolve(4)
  }, function (err) {
    console.log(err)
  })

  return deferred.promise
}

function get_lates (id) {
  var deferred = Q.defer()

  sql.execute({
    query: 'EmployeeServices.dbo.get_lates_dms'
  }).then(function (data) {
    late_arr = data

    deferred.resolve(5)
  }, function (err) {
    console.log(err)
  })

  return deferred.promise
}

function get_lates_excused (id) {
  var deferred = Q.defer()

  sql.execute({
    query: 'EmployeeServices.dbo.get_lates_dms_excused'
  }).then(function (data) {
    late_arr_excused = data

    deferred.resolve(6)
  }, function (err) {
    console.log(err)
  })

  return deferred.promise
}

function build_sql_data_obj (id) {
  var deferred = Q.defer()

  sql_data['Absences'] = abs_arr
  sql_data['Absences_Excused'] = abs_arr_excused
  sql_data['Early_Departures'] = early_arr
  sql_data['Early_Departures_Excused'] = early_arr_excused
  sql_data['Late_Arrivals'] = late_arr
  sql_data['Late_Arrivals_Excused'] = late_arr_excused

  console.log('STEP 7: COMPLETED Building sql_data Object')
  deferred.resolve(7)
  return deferred.promise
}

function console_log_this_shit (id) {
  var deferred = Q.defer()

  console.log('-----SQL_DATA: ' + JSON.stringify(sql_data['Absences_Excused'], null, 3))

  deferred.resolve(8)
  return deferred.promise
}

function write_to_file (id) {
  var deferred = Q.defer()

  var jsonfile = require('jsonfile')
  var file_to_write = './tmp/data.json'

  jsonfile.writeFile(file_to_write, sql_data, {spaces: 2}, function (err) {
    console.error(err)
  })

  deferred.resolve(9)
  return deferred.promise
}

function export_the_goods (id) {
  var deferred = Q.defer()

  module.exports = sql_data

  console.log('STEP 10: COMPLETED - sql_data Object Exported')
  deferred.resolve(10)
  return deferred.promise
}

function check_the_exported_goods (id) {
  var deferred = Q.defer()

  // console.log('MODULE.EXPORTS[Supervisors]: ' + module.exports['Supervisors'])
  console.log('-------DONE-------')

  deferred.resolve(11)
  return deferred.promise
}

var resultPromise = Q({})

resultPromise = resultPromise.then(function () {
  return set_default_config()
    .then(function (id) {
      return get_absences(id)
    })
    .then(function (id) {
      return get_absences_excused(id)
    })
    .then(function (id) {
      return get_earlies(id)
    })
    .then(function (id) {
      return get_earlies_excused(id)
    })
    .then(function (id) {
      return get_lates(id)
    })
    .then(function (id) {
      return get_lates_excused(id)
    })
    .then(function (id) {
      return build_sql_data_obj(id)
    })
    .then(function (id) {
      return console_log_this_shit(id)
    })
    .then(function (id) {
      return write_to_file(id)
    })
    .then(function (id) {
      return export_the_goods(id)
    })
    .then(function (id) {
      return check_the_exported_goods(id)
    })
})
