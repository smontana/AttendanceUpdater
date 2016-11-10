const sql = require('seriate')
const default_queries = require('./main-process/db/queries/default_queries.js')

global.record_counts = {};
global.page_counts = {};
global.page_record_limit = 100;

function get_absence_counts () {
  sql.execute({
    query: default_queries.get_absences_dms_count_for_pagination
  }).then(function (data) {
    var absence_record_count = data[0].absence_record_count;
    var absence_pages = Math.ceil(absence_record_count / page_record_limit);
    global.record_counts.absences = absence_record_count;
    global.page_counts.absences = absence_pages;
  }, function (err) {
    console.log(err)
  })
  return
}

function get_early_counts () {
  sql.execute({
    query: default_queries.get_earlies_dms_count_for_pagination
  }).then(function (data) {
    var early_record_count = data[0].early_record_count;
    var early_pages = Math.ceil(early_record_count / page_record_limit);
    global.record_counts.earlies = early_record_count;
    global.page_counts.earlies = early_pages;
  }, function (err) {
    console.log(err)
  })
  return
}

function get_late_counts () {
  sql.execute({
    query: default_queries.get_lates_dms_count_for_pagination
  }).then(function (data) {
    var late_record_count = data[0].late_record_count;
    var late_pages = Math.ceil(late_record_count / page_record_limit);
    global.record_counts.lates = late_record_count;
    global.page_counts.lates = late_pages;
  }, function (err) {
    console.log(err)
  })
  return
}

function get_counts () {
  get_absence_counts()
  get_early_counts()
  get_late_counts()
}

get_counts()
