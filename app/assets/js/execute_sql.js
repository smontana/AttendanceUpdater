var sql = require('seriate')

function execute_sql_and_build_graph (query_selection, graph_builder_obj) {
  if (Array.isArray(graph_builder_obj)) {
    var sql_procedure = sql.execute({
      query: query_selection
    }).then(function (data) {
      _.each(graph_builder_obj, function (x) { return x(data); })
    }, function (err) {
      console.log(err)
    })
  } else {
    var sql_procedure = sql.execute({
      query: query_selection
    }).then(function (data) {
      graph_builder_obj(data)
    }, function (err) {
      console.log(err)
    })
  }

  return sql_procedure
}

module.exports = execute_sql_and_build_graph
