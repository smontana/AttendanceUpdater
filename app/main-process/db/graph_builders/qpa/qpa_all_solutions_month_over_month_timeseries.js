var moment = require('moment');
var _ = require('lodash');

var qpa_all_solutions_month_over_month_timeseries = {

  build_qpa_all_solution_avgs_month_over_month_timeseries: function (data) {
    var cd_stats = _.filter(data, ['Solution', 'CD']);
    var crm_stats = _.filter(data, ['Solution', 'CRM']);
    var cso_stats = _.filter(data, ['Solution', 'CSO']);
    var dms_stats = _.filter(data, ['Solution', 'DMS']);
    var sfi_stats = _.filter(data, ['Solution', 'F&I']);
    var rts_stats = _.filter(data, ['Solution', 'RTS']);

    var get_dates = _.map(data, function(o) {
      var the_correct_the_date = moment(o.MonthStart).add(1, 'day').format("YYYY-MM-DD");
      return the_correct_the_date;
    });

    var uniq_dates = _.uniq(get_dates);
    uniq_dates.unshift('x');

    cd_qpa_avg = _.map(cd_stats, function(stats) {
      return stats.qpa_avg.toFixed(2)
    })
    cd_qpa_avg.unshift('cd_qpa_avg');

    crm_qpa_avg = _.map(crm_stats, function(stats) {
      return stats.qpa_avg.toFixed(2)
    })
    crm_qpa_avg.unshift('crm_qpa_avg');

    cso_qpa_avg = _.map(cso_stats, function(stats) {
      return stats.qpa_avg.toFixed(2)
    })
    cso_qpa_avg.unshift('cso_qpa_avg');

    dms_qpa_avg = _.map(dms_stats, function(stats) {
      return stats.qpa_avg.toFixed(2)
    })
    dms_qpa_avg.unshift('dms_qpa_avg');

    sfi_qpa_avg = _.map(sfi_stats, function(stats) {
      return stats.qpa_avg.toFixed(2)
    })
    sfi_qpa_avg.unshift('sfi_qpa_avg');

    rts_qpa_avg = _.map(rts_stats, function(stats) {
      return stats.qpa_avg.toFixed(2)
    })
    rts_qpa_avg.unshift('rts_qpa_avg');

    var chart = c3.generate({
      bindto: "#qpa_all_solutions_month_over_month_avgs",
      padding: {
        top: 10,
        // right: 50,
        bottom: 10,
        left: 70
      },
      data: {
        x: 'x',
        columns: [
          uniq_dates,
          cd_qpa_avg,
          crm_qpa_avg,
          cso_qpa_avg,
          dms_qpa_avg,
          sfi_qpa_avg,
          rts_qpa_avg
        ],
        names: {
          uniq_dates: 'Month',
          cd_qpa_avg: 'Central Dispatch',
          crm_qpa_avg: 'CRM',
          cso_qpa_avg: 'CSO - Billing',
          dms_qpa_avg: 'DMS',
          sfi_qpa_avg: 'F&I',
          rts_qpa_avg: 'RTS'
        }
      },
      legend: {
        position: 'right'
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%m-%Y',
            fit: true,
            outer: false
          }
        }
      },
      grid: {
        x: {
          show: true
        },
        y: {
          show: true
        }
      },
      zoom: {
        enabled: true
      }
    });
  },

//-------------------------------------------------------------------------------------

  build_qpa_all_solution_counts_month_over_month_timeseries: function (data) {
    var cd_stats = _.filter(data, ['Solution', 'CD']);
    var crm_stats = _.filter(data, ['Solution', 'CRM']);
    var cso_stats = _.filter(data, ['Solution', 'CSO']);
    var dms_stats = _.filter(data, ['Solution', 'DMS']);
    var sfi_stats = _.filter(data, ['Solution', 'F&I']);
    var rts_stats = _.filter(data, ['Solution', 'RTS']);

    var get_dates = _.map(data, function(o) {
      var the_correct_the_date = moment(o.MonthStart).add(1, 'day').format("YYYY-MM-DD");
      return the_correct_the_date;
    });

    var uniq_dates = _.uniq(get_dates);
    uniq_dates.unshift('x');

    cd_qpa_count = _.map(cd_stats, function(stats) {
      return stats.qpa_count
    })
    cd_qpa_count.unshift('cd_qpa_count');

    crm_qpa_count = _.map(crm_stats, function(stats) {
      return stats.qpa_count
    })
    crm_qpa_count.unshift('crm_qpa_count');

    cso_qpa_count = _.map(cso_stats, function(stats) {
      return stats.qpa_count
    })
    cso_qpa_count.unshift('cso_qpa_count');

    dms_qpa_count = _.map(dms_stats, function(stats) {
      return stats.qpa_count
    })
    dms_qpa_count.unshift('dms_qpa_count');

    sfi_qpa_count = _.map(sfi_stats, function(stats) {
      return stats.qpa_count
    })
    sfi_qpa_count.unshift('sfi_qpa_count');

    rts_qpa_count = _.map(rts_stats, function(stats) {
      return stats.qpa_count
    })
    rts_qpa_count.unshift('rts_qpa_count');

    var chart = c3.generate({
      bindto: "#qpa_all_solutions_month_over_month_cnts",
      padding: {
        top: 10,
        // right: 50,
        bottom: 10,
        left: 70
      },
      data: {
        x: 'x',
        columns: [
          uniq_dates,
          cd_qpa_count,
          crm_qpa_count,
          cso_qpa_count,
          dms_qpa_count,
          sfi_qpa_count,
          rts_qpa_count
        ],
        names: {
          uniq_dates: 'Month',
          cd_qpa_count: 'Central Dispatch',
          crm_qpa_count: 'CRM',
          cso_qpa_count: 'CSO - Billing',
          dms_qpa_count: 'DMS',
          sfi_qpa_count: 'F&I',
          rts_qpa_count: 'RTS'
        }
      },
      legend: {
        position: 'right'
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%m-%Y',
            fit: true,
            outer: false
          }
        }
      },
      grid: {
        x: {
          show: true
        },
        y: {
          show: true
        }
      },
      zoom: {
        enabled: true
      }
    });
  }
};

module.exports = qpa_all_solutions_month_over_month_timeseries;
