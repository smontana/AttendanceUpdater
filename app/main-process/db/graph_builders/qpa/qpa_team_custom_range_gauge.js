var qpa_team_custom_gauge_avg = {
  build_custom_range_team_avg_gauge: function (data) {
    var cd_stats = _.filter(data, ['solution', 'CD'])

    // -------------------------------------------------------

    CD_qpa_count = _.map(cd_stats, function (stats) {
      return stats.qpa_count
    })

    // -------------------------------------------------------

    CD_autofail_count = _.map(cd_stats, function (stats) {
      return stats.autofail_count
    })

    // -------------------------------------------------------

    CD_qpa_avg = _.map(cd_stats, function (stats) {
      return stats.qpa_avg.toFixed(2)
    })

    // -------------------------------------------------------

    var cd_chart = c3.generate({
      bindto: '#cd_qpa_custom_range_avg_gauge',
      data: {
        columns: [
          ['CD QPA AVG', CD_qpa_avg]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log('onclick', d, i); }
      // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
      // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
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

  }
}

module.exports = qpa_team_custom_gauge_avg
