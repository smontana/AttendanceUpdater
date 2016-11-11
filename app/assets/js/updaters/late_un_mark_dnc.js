var sql = require('seriate');
var _ = require('lodash');


function update_late_dnc_by_id () {
  var dnc_ids = [];

  $('#late_tbody').find('tr').each(function () {
    var row = $(this)
    var checked = row.find('input[type="checkbox"]').is(':checked')
    var record_id = row.attr('data-id')
    if (checked) {
      dnc_ids.push(record_id)
    }
  })

  var sql_procedure = _.forEach(dnc_ids, function(record_id) {
    sql.execute({
      query: query_default.un_mark_late_as_dnc + ' ' + record_id
    }).then(function (data) {
      console.log('late ids unmarked as dnc: ' + dnc_ids)
      alert('Late Arrival IDs marked as unexcused: ' + dnc_ids)
      reload_page();
    }, function (err) {
      console.log(err)
    })
  })

  return sql_procedure
}

module.exports = update_late_dnc_by_id
