var sql = require('seriate');
var _ = require('lodash');
var moment = require('moment');
// var query_default = require('../../main-process/db/queries/default_queries.js');

function execute_query_and_build_abs_table() {
  function createAttendanceTable(query_results) {
    var parent_el = document.getElementsByClassName("absence_table_container")[0];
    var row_count = query_results.length;
    var cols = ['Select','ID','Date','Agent','Notes','Excused'];

    var abs_table = '<table id="abs_table" style="width:100%" border="1"><thead id="abs_thead"><tr><th>Select</th><th>ID</th><th>Date</th><th>Agent</th><th>Notes</th><th>Excused</th></tr></thead><tbody id="abs_tbody">';

    _.forEach(query_results, function(record) {
      var pretty_date = moment(record.FullDate).format('MM/DD/YYYY');
      var pretty_abs_dnc = '';

      if (record.abs_dnc == 1) {
        pretty_abs_dnc = 'YES'
      }

      var new_row = '<tr data-id="' + record.id + '"><td><input type="checkbox" name="dnc_indicator" />&nbsp;</td><td>' + record.id + '</td><td>' + pretty_date + '</td><td>' + record.Agent + '</td><td>' + record.ActivityNotes + '</td><td>' + pretty_abs_dnc + '</td></tr>';
      abs_table += new_row
    })

    var finish_table = '</tbody></table>';
    abs_table += finish_table;

    parent_el.innerHTML = abs_table;
  }

  var sql_procedure = sql.execute({
    query: query_default.get_absences_dms
  }).then(function (data) {
    // console.log(data)
    createAttendanceTable(data)
  }, function (err) {
    console.log(err)
  })

  return sql_procedure
}

module.exports = execute_query_and_build_abs_table
