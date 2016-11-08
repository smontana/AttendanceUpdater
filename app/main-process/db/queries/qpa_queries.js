module.exports = {
  get_QPA_solution_avg_by_yr: 'EmployeeServices.dbo.get_QPA_solution_avg_by_yr',
  // below query needs Solution selected
  get_QPA_solution_workgroups_avg_by_yr: 'EmployeeServices.dbo.get_QPA_solution_workgroups_avg_by_yr',
  // below query needs Solution-Workgroup selected
  get_QPA_solution_workgroup_teams_avg_by_yr: 'EmployeeServices.dbo.get_QPA_solution_workgroup_teams_avg_by_yr',
  // below query needs Solution-Workgroup-Supervisor selected
  get_QPA_solution_workgroup_teams_supervisor_avg_by_yr: 'EmployeeServices.dbo.get_QPA_solution_workgroup_team_supervisor_avg_by_yr',

  get_QPA_all_solution_avgs_month_over_month_by_yr: 'EmployeeServices.dbo.get_QPA_solution_ytd_avg_month_over_month',

  // -----------------------BETWEEN DATES--------------------------\\
  // -- @StartDate, @EndDate (All Solutions)
  get_overall_QPA_solution_avg_between_dates: 'EmployeeServices.dbo.get_overall_QPA_solution_avg_between_dates',
  // -- @StartDate, @EndDate, @Supervisor
  get_overall_QPA_team_avg_between_dates: 'EmployeeServices.dbo.get_overall_QPA_team_avg_between_dates',
  // -- @StartDate, @EndDate, @AgentName
  get_overall_QPA_agent_avg_between_dates: 'EmployeeServices.dbo.get_overall_QPA_agent_avg_between_dates',

  // -- @StartDate, @EndDate (All Solutions)
  get_QPA_solution_avg_month_over_month_between_dates: 'EmployeeServices.dbo.get_QPA_solution_avg_month_over_month_between_dates',
  // -- @StartDate, @EndDate, @Supervisor
  get_QPA_team_avg_month_over_month_between_dates: 'EmployeeServices.dbo.get_QPA_team_avg_month_over_month_between_dates',
  // -- @StartDate, @EndDate, @AgentName
  get_QPA_agent_avg_month_over_month_between_dates: 'EmployeeServices.dbo.get_QPA_agent_avg_month_over_month_between_dates',

  // -- @StartDate, @EndDate, @Solution, @Supervisor
  query_QPA_scores_by_team_and_supervisor: 'EmployeeServices.dbo.query_QPA_scores_by_team_and_supervisor'
}
