var qpa_solution_yearly_avgs = {
  build_solution_workgroups_yearly_avg_graphs: function (data, solution) {
    if (solution == 'CD') {
      var CD_billing = _.filter(data, ['WorkGroup', 'Billing Team'])
      var CD_central_dispatch = _.filter(data, ['WorkGroup', 'Central Dispatch'])
      var CD_complaints = _.filter(data, ['WorkGroup', 'Complaints Team'])
      var CD_processing = _.filter(data, ['WorkGroup', 'Processing Team'])
    } else if (solution == 'CRM') {
      var CRM_aa = _.filter(data, ['WorkGroup', 'CRM - AA'])
      var CRM_ddc = _.filter(data, ['WorkGroup', 'CRM - DDC'])
    } else if (solution == 'CSO') {
      var CSO = _.filter(data, ['WorkGroup', 'Billing'])
    } else if (solution == 'DMS') {
      var DMS_accounting = _.filter(data, ['WorkGroup', 'Accounting'])
      var DMS_business_office = _.filter(data, ['WorkGroup', 'Business Office'])
      var DMS_two_point_zero = _.filter(data, ['WorkGroup', 'DMS 2.0'])
      var DMS_fixed_ops = _.filter(data, ['WorkGroup', 'Fixed Ops'])
      var DMS_serv_pro = _.filter(data, ['WorkGroup', 'Service Pro'])
      var DMS_sys_admin = _.filter(data, ['WorkGroup', 'System Admin'])
    } else if (solution == 'F&I') {
      var SFI = _.filter(data, ['WorkGroup', 'F&I - General'])
    } else if (solution == 'RTS') {
      var RTS = _.filter(data, ['WorkGroup', 'RTS'])
    }

    // -------------------------------------------------------

    CD_qpa_count = _.map(cd_stats, function (stats) {
      return stats.qpa_count
    })

    CRM_qpa_count = _.map(crm_stats, function (stats) {
      return stats.qpa_count
    })

    CSO_qpa_count = _.map(cso_stats, function (stats) {
      return stats.qpa_count
    })

    DMS_qpa_count = _.map(dms_stats, function (stats) {
      return stats.qpa_count
    })

    FI_qpa_count = _.map(fi_stats, function (stats) {
      return stats.qpa_count
    })

    RTS_qpa_count = _.map(rts_stats, function (stats) {
      return stats.qpa_count
    })

    // -------------------------------------------------------

    CD_autofail_count = _.map(cd_stats, function (stats) {
      return stats.autofail_count
    })

    CRM_autofail_count = _.map(crm_stats, function (stats) {
      return stats.autofail_count
    })

    CSO_autofail_count = _.map(cso_stats, function (stats) {
      return stats.autofail_count
    })

    DMS_autofail_count = _.map(dms_stats, function (stats) {
      return stats.autofail_count
    })

    FI_autofail_count = _.map(fi_stats, function (stats) {
      return stats.autofail_count
    })

    RTS_autofail_count = _.map(rts_stats, function (stats) {
      return stats.autofail_count
    })

    // -------------------------------------------------------

    CD_qpa_avg = _.map(cd_stats, function (stats) {
      return stats.qpa_avg.toFixed(2)
    })

    CRM_qpa_avg = _.map(crm_stats, function (stats) {
      return stats.qpa_avg.toFixed(2)
    })

    CSO_qpa_avg = _.map(cso_stats, function (stats) {
      return stats.qpa_avg.toFixed(2)
    })

    DMS_qpa_avg = _.map(dms_stats, function (stats) {
      return stats.qpa_avg.toFixed(2)
    })

    FI_qpa_avg = _.map(fi_stats, function (stats) {
      return stats.qpa_avg.toFixed(2)
    })

    RTS_qpa_avg = _.map(rts_stats, function (stats) {
      return stats.qpa_avg.toFixed(2)
    })

    // -------------------------------------------------------

    var cd_chart = c3.generate({
      bindto: '#cd_qpa_yr_avg_gauge',
      data: {
        columns: [
          ['CD QPA AVG', CD_qpa_avg]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log('onclick', d, i); }
      },
      gauge: {
        width: 20 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F6C600', '#60B044', '#FF00FF'],
        threshold: {
          values: [61, 75, 86, 100]
        }
      },
      size: {
        height: 70
      },
      tooltip: {
        show: false
      }
    })

    // -------------------------------------------------------

    var crm_chart = c3.generate({
      bindto: '#crm_qpa_yr_avg_gauge',
      data: {
        columns: [
          ['CRM QPA AVG', CRM_qpa_avg]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log('onclick', d, i); }
      },
      gauge: {
        width: 20 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F6C600', '#60B044', '#FF00FF'],
        threshold: {
          values: [61, 75, 86, 100]
        }
      },
      size: {
        height: 70
      },
      tooltip: {
        show: false
      }
    })

    // -------------------------------------------------------

    var cso_chart = c3.generate({
      bindto: '#cso_qpa_yr_avg_gauge',
      data: {
        columns: [
          ['CSO QPA AVG', CSO_qpa_avg]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log('onclick', d, i); }
      },
      gauge: {
        width: 20 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F6C600', '#60B044', '#FF00FF'],
        threshold: {
          values: [61, 75, 86, 100]
        }
      },
      size: {
        height: 70
      },
      tooltip: {
        show: false
      }
    })

    // -------------------------------------------------------

    var dms_chart = c3.generate({
      bindto: '#dms_qpa_yr_avg_gauge',
      data: {
        columns: [
          ['DMS QPA AVG', DMS_qpa_avg]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log('onclick', d, i); }
      },
      gauge: {
        width: 20 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F6C600', '#60B044', '#FF00FF'],
        threshold: {
          values: [61, 75, 86, 100]
        }
      },
      size: {
        height: 70
      },
      tooltip: {
        show: false
      }
    })

    // -------------------------------------------------------

    var fi_chart = c3.generate({
      bindto: '#fi_qpa_yr_avg_gauge',
      data: {
        columns: [
          ['F&I QPA AVG', FI_qpa_avg]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log('onclick', d, i); }
      },
      gauge: {
        width: 20 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F6C600', '#60B044', '#FF00FF'],
        threshold: {
          values: [61, 75, 86, 100]
        }
      },
      size: {
        height: 70
      },
      tooltip: {
        show: false
      }
    })

    // -------------------------------------------------------

    var rts_chart = c3.generate({
      bindto: '#rts_qpa_yr_avg_gauge',
      data: {
        columns: [
          ['RTS QPA AVG', RTS_qpa_avg]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log('onclick', d, i); }
      },
      gauge: {
        width: 20 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F6C600', '#60B044', '#FF00FF'],
        threshold: {
          values: [61, 75, 86, 100]
        }
      },
      size: {
        height: 70
      },
      tooltip: {
        show: false
      }
    })
  }
}

module.exports = qpa_solution_yearly_avgs
