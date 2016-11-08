var rts_attendance_js = {
  build_solution_absence_counts_by_yr_graph: function (data) {
    var rts_stats = _.filter(data, ['Solution', 'RTS'])

    RTS_abs_count = _.map(rts_stats, function (stats) {
      return stats.absence_count
    })

    var chart = c3.generate({
      bindto: '#attendance_rts_abs_cnt_gauge',
      data: {
        columns: [
          ['RTS ABS #', RTS_abs_count]
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
    var rts_stats = _.filter(data, ['Solution', 'RTS'])

    RTS_late_count = _.map(rts_stats, function (stats) {
      return stats.late_count
    })

    var chart = c3.generate({
      bindto: '#attendance_rts_late_cnt_gauge',
      data: {
        columns: [
          ['RTS Late #', RTS_late_count]
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
    var rts_stats = _.filter(data, ['Solution', 'RTS'])

    RTS_early_count = _.map(rts_stats, function (stats) {
      return stats.early_count
    })

    var chart = c3.generate({
      bindto: '#attendance_rts_early_cnt_gauge',
      data: {
        columns: [
          ['RTS Early #', RTS_early_count]
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

module.exports = rts_attendance_js
