var sql = require('seriate');
var _ = require('lodash');
var moment = require('moment');

function execute_query_and_build_early_table() {
  function createEarlyTable(query_results) {
    var parent_el = document.getElementsByClassName("early_table_container")[0];
    var row_count = query_results.length;
    var cols = ['Select','Excused','ID','Date','Agent'];

    var early_table = '<table id="early_table" style="width:100%" border="1"><thead id="abs_thead"><tr><th>Select</th><th>ID</th><th>Excused</th><th>Date</th><th>Agent</th></tr></thead><tbody id="early_tbody">';

    _.forEach(query_results, function(record) {
      var pretty_date = moment(record.FullDate).add(1, 'd').format('MM/DD/YYYY');
      var early_dnc = '';

      if (record.early_dnc == 1) {
        early_dnc = 'YES'
      }

      var new_row = '<tr data-id="' + record.id + '"><td><input type="checkbox" name="dnc_indicator" />&nbsp;</td><td>' + record.id + '</td><td>' + early_dnc + '</td><td>' + pretty_date + '</td><td>' + record.Agent + '</td></tr>';
      early_table += new_row
    })

    var finish_table = '</tbody></table>';
    early_table += finish_table;

    parent_el.innerHTML = early_table;
  }

  var sql_procedure = sql.execute({
    query: query_default.get_earlies_dms_recent_300
  }).then(function (data) {
    createEarlyTable(data)
  }, function (err) {
    console.log(err)
  })

  return sql_procedure
}

module.exports = execute_query_and_build_early_table
