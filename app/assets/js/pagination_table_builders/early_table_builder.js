var sql = require('seriate');
var _ = require('lodash');
var moment = require('moment');

function pad(num) {
  return ("0"+num).slice(-2);
}

function hhmmss(secs) {
  var minutes = Math.floor(secs / 60);
  secs = secs%60;
  var hours = Math.floor(minutes/60)
  minutes = minutes%60;
  return pad(hours)+":"+pad(minutes)+":"+pad(secs);
}

function execute_query_and_build_early_table(page_num) {

  if (page_num == 1) {
    var constructed_query = query_default.get_earlies_dms_paginate_home  + ' ' + page_record_limit;
  } else {
    var offset = ((page_num - 1) * page_record_limit) + 1;
    var limit = page_record_limit;
    var constructed_query = query_default.get_earlies_dms_paginate + ' ' + offset + ', ' + limit;
  }

  function createEarlyTable(query_results) {
    var parent_el = document.getElementsByClassName("early_table_container")[0];
    var row_count = query_results.length;
    var cols = ['Select','Excused','ID','Date','Agent','Left Early Time (HH:mm:ss)'];
    var early_table = '<table id="early_table" style="width:100%" border="1"><thead id="abs_thead"><tr><th>Select</th><th>ID</th><th>Excused</th><th>Date</th><th>Agent</th><th>Left Early Time (HH:mm:ss)</th></tr></thead><tbody id="early_tbody">';

    _.forEach(query_results, function(record) {
      var pretty_date = moment(record.FullDate).add(1, 'd').format('MM/DD/YYYY');
      var early_dnc = '';
      var pretty_left_early_time = hhmmss(record.Early_Departure_Time_ss);

      if (record.early_dnc == 1) {
        early_dnc = 'YES'
      }

      var new_row = '<tr data-id="' + record.id + '"><td><input type="checkbox" name="dnc_indicator" />&nbsp;</td><td>' + record.id + '</td><td>' + early_dnc + '</td><td>' + pretty_date + '</td><td>' + record.Agent + '</td><td>' + pretty_left_early_time + '</td></tr>';
      early_table += new_row
    })

    var finish_table = '</tbody></table>';
    early_table += finish_table;
    parent_el.innerHTML = early_table;
  }

  var sql_procedure = sql.execute({
    query: constructed_query
  }).then(function (data) {
    createEarlyTable(data)
  }, function (err) {
    console.log(err)
  })

  return sql_procedure
}

module.exports = execute_query_and_build_early_table
