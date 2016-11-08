var sql = require('seriate')

function execute_default_sql (query_selection) {
  var sql_procedure = sql.execute({
    query: query_selection
  }).then(function (data) {
    console.log(data)
    var data = data
  }, function (err) {
    console.log(err)
  })

  return sql_procedure
}

module.exports = execute_default_sql
