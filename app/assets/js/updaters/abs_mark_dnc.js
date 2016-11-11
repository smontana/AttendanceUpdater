var sql = require('seriate');
var _ = require('lodash');


function update_abs_dnc_by_id () {
  var dnc_ids = [];

  $('#abs_tbody').find('tr').each(function () {
    var row = $(this)
    var checked = row.find('input[type="checkbox"]').is(':checked')
    var record_id = row.attr('data-id')
    if (checked) {
      dnc_ids.push(record_id)
    }
  })

  var sql_procedure = _.forEach(dnc_ids, function(record_id) {
    sql.execute({
      query: query_default.mark_absence_as_dnc + ' ' + record_id
    }).then(function (data) {
      console.log('abs ids marked as dnc: ' + dnc_ids)
      alert('Absence IDs marked as excused: ' + dnc_ids)
      reload_page();
    }, function (err) {
      console.log(err)
    })
  })

  return sql_procedure
}

module.exports = update_abs_dnc_by_id
