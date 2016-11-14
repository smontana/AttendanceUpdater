var sql = require('seriate');
var _ = require('lodash');
var moment = require('moment');

function execute_query_and_build_abs_table(page_num) {

  if (page_num == 1) {
    var constructed_query = query_default.get_absences_dms_paginate_home  + ' ' + page_record_limit;
  } else {
    var offset = ((page_num - 1) * page_record_limit) + 1;
    var limit = page_record_limit;
    var constructed_query = query_default.get_absences_dms_paginate + ' ' + offset + ', ' + limit;
  }

  function createAttendanceTable(query_results) {
    var parent_el = document.getElementsByClassName("absence_table_container")[0];
    var row_count = query_results.length;
    var cols = ['Select','Excused','ID','Date','Agent','Notes'];
    var abs_table = '<table id="abs_table" style="width:100%" border="1"><thead id="abs_thead"><tr><th>Select</th><th>ID</th><th>Excused</th><th>Date</th><th>Agent</th><th>Notes</th></tr></thead><tbody id="abs_tbody">';

    _.forEach(query_results, function(record) {
      var pretty_date = moment(record.FullDate).add(1, 'd').format('MM/DD/YYYY');
      var pretty_abs_dnc = '';

      if (record.abs_dnc == 1) {
        pretty_abs_dnc = 'YES'
      }

      var new_row = '<tr data-id="' + record.id + '"><td><input type="checkbox" name="dnc_indicator" />&nbsp;</td><td>' + record.id + '</td><td>' + pretty_abs_dnc + '</td><td>' + pretty_date + '</td><td>' + record.Agent + '</td><td>' + record.ActivityNotes + '</td></tr>';
      abs_table += new_row
    })

    var finish_table = '</tbody></table>';
    abs_table += finish_table;
    parent_el.innerHTML = abs_table;
  }

  var sql_procedure = sql.execute({
    query: constructed_query
  }).then(function (data) {
    createAttendanceTable(data)
  }, function (err) {
    console.log(err)
  })

  return sql_procedure
}

module.exports = execute_query_and_build_abs_table
