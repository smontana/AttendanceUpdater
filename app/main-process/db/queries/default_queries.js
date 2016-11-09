module.exports = {
  get_absences_dms: 'EmployeeServices.dbo.get_absences_dms',
  get_absences_dms_excused: 'EmployeeServices.dbo.get_absences_dms_excused',
  get_earlies_dms: 'EmployeeServices.dbo.get_earlies_dms',
  get_earlies_dms_excused: 'EmployeeServices.dbo.get_earlies_dms_excused',
  get_lates_dms: 'EmployeeServices.dbo.get_lates_dms',
  get_lates_dms_excused: 'EmployeeServices.dbo.get_lates_dms_excused',

  //--Update Procs

  // -- space + absence record id
  mark_absence_as_dnc: 'EmployeeServices.dbo.mark_absence_as_dnc',
  // -- space + absence record id
  un_mark_absence_as_dnc: 'EmployeeServices.dbo.un_mark_absence_as_dnc'
}
