var sql = require('seriate')
var query_default = require('../../main-process/db/queries/default_queries.js')

function absence_record (id, abs_dnc, FullDate, EMPID, Solution, WorkGroup, Supervisor, Agent) {
  this.id = id;
  this.abs_dnc = abs_dnc;
  this.name = Agent;
  this.empid = EMPID;
  this.full_date = FullDate;
  this.solution = Solution;
  this.workgorup = WorkGroup;
  this.supervisor = Supervisor;
}

module.exports = {
  get_absences_dms: function () {
    var solution_query = query_default.get_absences_dms

    sql.execute({
      query: solution_query
    }).then(function (data) {
      console.log(data)

      _.forEach(data, function (s) {
        var record = new absence_record(s.id, s.abs_dnc, s.FullDate, s.EMPID, s.Solution, s.WorkGroup, s.Supervisor, s.Agent)
        Solutions.push(solution)

        var id
        var abs_dnc
        var FullDate
        var EMPID
        var Solution
        var WorkGroup
        var Supervisor
        var Agent



      })
    }, function (err) {
      console.log(err)
    })
  },

  get_all_supervisors: function () {
    var supervisor_query = query_default.get_distinct_qpa_supervisors

    sql.execute({
      query: supervisor_query
    }).then(function (data) {
      console.log(data)

      _.forEach(data, function (s) {
        var supervisor = {
          solution: s.Solution,
          name: s.Supervisor,
          solution_supervisor: s.SolutionSupervisor
        }

        Supervisors.push(supervisor)
      })
    }, function (err) {
      console.log(err)
    })
  },

  get_all_agents: function () {
    var agent_query = query_default.get_distinct_qpa_agents

    sql.execute({
      query: agent_query
    }).then(function (data) {
      console.log(data)

      _.forEach(data, function (s) {
        var agent = s.Agent
        Agents.push(agent)
      })
    }, function (err) {
      console.log(err)
    })
  }
}
