var sql = require('seriate');
var _ = require('lodash');
var moment = require('moment');

function execute_query_and_build_late_table() {
  function createLateTable(query_results) {
    var parent_el = document.getElementsByClassName("late_table_container")[0];
    var row_count = query_results.length;
    var cols = ['Select','Excused','ID','Date','Agent'];

    var late_table = '<table id="late_table" style="width:100%" border="1"><thead id="abs_thead"><tr><th>Select</th><th>ID</th><th>Excused</th><th>Date</th><th>Agent</th></tr></thead><tbody id="late_tbody">';

    _.forEach(query_results, function(record) {
      var pretty_date = moment(record.FullDate).format('MM/DD/YYYY');
      var late_dnc = '';

      if (record.late_dnc == 1) {
        late_dnc = 'YES'
      }

      var new_row = '<tr data-id="' + record.id + '"><td><input type="checkbox" name="dnc_indicator" />&nbsp;</td><td>' + record.id + '</td><td>' + late_dnc + '</td><td>' + pretty_date + '</td><td>' + record.Agent + '</td></tr>';
      late_table += new_row
    })

    var finish_table = '</tbody></table>';
    late_table += finish_table;

    parent_el.innerHTML = late_table;
  }

  var sql_procedure = sql.execute({
    query: query_default.get_lates_dms
  }).then(function (data) {
    createLateTable(data)
  }, function (err) {
    console.log(err)
  })

  return sql_procedure
}

module.exports = execute_query_and_build_late_table
