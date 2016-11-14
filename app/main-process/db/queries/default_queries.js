module.exports = {
  get_absences_dms: 'EmployeeServices.dbo.get_absences_dms',
  get_absences_dms_excused: 'EmployeeServices.dbo.get_absences_dms_excused',
  get_earlies_dms: 'EmployeeServices.dbo.get_earlies_dms',
  get_earlies_dms_excused: 'EmployeeServices.dbo.get_earlies_dms_excused',
  get_lates_dms: 'EmployeeServices.dbo.get_lates_dms',
  get_lates_dms_excused: 'EmployeeServices.dbo.get_lates_dms_excused',

  //--Update Procs
  //-- space + absence record id
  mark_absence_as_dnc: 'EmployeeServices.dbo.mark_absence_as_dnc',
  un_mark_absence_as_dnc: 'EmployeeServices.dbo.un_mark_absence_as_dnc',
  mark_early_as_dnc: 'EmployeeServices.dbo.mark_early_as_dnc',
  un_mark_early_as_dnc: 'EmployeeServices.dbo.un_mark_early_as_dnc',
  mark_late_as_dnc: 'EmployeeServices.dbo.mark_late_as_dnc',
  un_mark_late_as_dnc: 'EmployeeServices.dbo.un_mark_late_as_dnc',

  //--Pagination Queries
  //-- space + @Offset, @Limit (int)
  get_absences_dms_paginate:'EmployeeServices.dbo.get_absences_dms_paginate',
  get_earlies_dms_paginate:'EmployeeServices.dbo.get_earlies_dms_paginate',
  get_lates_dms_paginate:'EmployeeServices.dbo.get_lates_dms_paginate',
  //-- space + @Limit (int)
  get_absences_dms_paginate_home:'EmployeeServices.dbo.get_absences_dms_paginate_home',
  get_earlies_dms_paginate_home:'EmployeeServices.dbo.get_earlies_dms_paginate_home',
  get_lates_dms_paginate_home:'EmployeeServices.dbo.get_lates_dms_paginate_home',
  //-- COUNTS
  get_absences_dms_count_for_pagination: 'EmployeeServices.dbo.get_absences_dms_count_for_pagination',
  get_earlies_dms_count_for_pagination: 'EmployeeServices.dbo.get_earlies_dms_count_for_pagination',
  get_lates_dms_count_for_pagination: 'EmployeeServices.dbo.get_lates_dms_count_for_pagination',

  //--Random Queries to be replaced by pagination
  get_absences_dms_recent_100: 'EmployeeServices.dbo.get_absences_dms_recent_100',
  get_earlies_dms_recent_100: 'EmployeeServices.dbo.get_earlies_dms_recent_100',
  get_lates_dms_recent_100: 'EmployeeServices.dbo.get_lates_dms_recent_100',
  get_earlies_dms_recent_300: 'EmployeeServices.dbo.get_earlies_dms_recent_300',
  get_lates_dms_recent_300: 'EmployeeServices.dbo.get_lates_dms_recent_300',

  //--Lookup Queries
  get_dms_absence_agents_names: 'EmployeeServices.dbo.get_dms_absence_agents_names',
  get_absences_dms_by_agent: 'EmployeeServices.dbo.get_absences_dms_by_agent'
}
