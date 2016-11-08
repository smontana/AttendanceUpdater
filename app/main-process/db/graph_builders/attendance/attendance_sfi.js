var sfi_attendance_js = {
  build_solution_absence_counts_by_yr_graph: function (data) {
    var sfi_stats = _.filter(data, ['Solution', 'F&I'])

    SFI_abs_count = _.map(sfi_stats, function (stats) {
      return stats.absence_count
    })

    var chart = c3.generate({
      bindto: '#attendance_sfi_abs_cnt_gauge',
      data: {
        columns: [
          ['F&I ABS #', SFI_abs_count]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log('onclick', d, i); }
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value
          },
          show: true
        },
        min: 0,
        max: 500,
        width: 25 // for adjusting arc thickness
      },
      color: {
        pattern: ['#60B044', '#F97600', '#F6C600', '#FF0000'], // the three color levels for the percentage values.
        threshold: {
          unit: 'value', // percentage is default
          // max: 200, // 100 is default
          values: [60, 120, 180, 240]
        }
      },
      size: {
        height: 100
      }
    })
  },

  build_solution_late_counts_by_yr_graph: function (data) {
    var sfi_stats = _.filter(data, ['Solution', 'F&I'])

    SFI_late_count = _.map(sfi_stats, function (stats) {
      return stats.late_count
    })

    var chart = c3.generate({
      bindto: '#attendance_sfi_late_cnt_gauge',
      data: {
        columns: [
          ['F&I Late #', SFI_late_count]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log('onclick', d, i); }
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value
          },
          show: true
        },
        min: 0,
        max: 500,
        width: 25 // for adjusting arc thickness
      },
      color: {
        pattern: ['#60B044', '#F97600', '#F6C600', '#FF0000'], // the three color levels for the percentage values.
        threshold: {
          unit: 'value', // percentage is default
          // max: 200, // 100 is default
          values: [60, 120, 180, 240]
        }
      },
      size: {
        height: 100
      }
    })
  },

  build_solution_early_counts_by_yr_graph: function (data) {
    var sfi_stats = _.filter(data, ['Solution', 'F&I'])

    SFI_early_count = _.map(sfi_stats, function (stats) {
      return stats.early_count
    })

    var chart = c3.generate({
      bindto: '#attendance_sfi_early_cnt_gauge',
      data: {
        columns: [
          ['F&I Early #', SFI_early_count]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log('onclick', d, i); }
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value
          },
          show: true
        },
        min: 0,
        max: 500,
        width: 25 // for adjusting arc thickness
      },
      color: {
        pattern: ['#60B044', '#F97600', '#F6C600', '#FF0000'], // the three color levels for the percentage values.
        threshold: {
          unit: 'value', // percentage is default
          // max: 200, // 100 is default
          values: [60, 120, 180, 240]
        }
      },
      size: {
        height: 100
      }
    })
  }

}

module.exports = sfi_attendance_js
