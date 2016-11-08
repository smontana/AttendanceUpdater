var _ = require('lodash');

var qpa_all_solutions_custom_range_bar_chart = {

  build_qpa_all_solution_avgs_custom_range_bar_chart: function (data) {
    var cd_stats = _.filter(data, ['solution', 'CD']);
    var crm_stats = _.filter(data, ['solution', 'CRM']);
    var cso_stats = _.filter(data, ['solution', 'CSO']);
    var dms_stats = _.filter(data, ['solution', 'DMS']);
    var sfi_stats = _.filter(data, ['solution', 'F&I']);
    var rts_stats = _.filter(data, ['solution', 'RTS']);

    // -------------------------------------------------------

    CD_qpa_count = _.map(cd_stats, function(stats) {
      return stats.qpa_count
    })

    CRM_qpa_count = _.map(crm_stats, function(stats) {
      return stats.qpa_count
    })

    CSO_qpa_count = _.map(cso_stats, function(stats) {
      return stats.qpa_count
    })

    DMS_qpa_count = _.map(dms_stats, function(stats) {
      return stats.qpa_count
    })

    SFI_qpa_count = _.map(sfi_stats, function(stats) {
      return stats.qpa_count
    })

    RTS_qpa_count = _.map(rts_stats, function(stats) {
      return stats.qpa_count
    })

    // -------------------------------------------------------

    CD_autofail_count = _.map(cd_stats, function(stats) {
      return stats.autofail_count
    })

    CRM_autofail_count = _.map(crm_stats, function(stats) {
      return stats.autofail_count
    })

    CSO_autofail_count = _.map(cso_stats, function(stats) {
      return stats.autofail_count
    })

    DMS_autofail_count = _.map(dms_stats, function(stats) {
      return stats.autofail_count
    })

    SFI_autofail_count = _.map(sfi_stats, function(stats) {
      return stats.autofail_count
    })

    RTS_autofail_count = _.map(rts_stats, function(stats) {
      return stats.autofail_count
    })

    // -------------------------------------------------------

    CD_qpa_avg = _.map(cd_stats, function(stats) {
      return stats.qpa_avg.toFixed(2)
    })
    CD_qpa_avg.unshift('CD_qpa_avg');

    CRM_qpa_avg = _.map(crm_stats, function(stats) {
      return stats.qpa_avg.toFixed(2)
    })
    CRM_qpa_avg.unshift('CRM_qpa_avg');

    CSO_qpa_avg = _.map(cso_stats, function(stats) {
      return stats.qpa_avg.toFixed(2)
    })
    CSO_qpa_avg.unshift('CSO_qpa_avg');

    DMS_qpa_avg = _.map(dms_stats, function(stats) {
      return stats.qpa_avg.toFixed(2)
    })
    DMS_qpa_avg.unshift('DMS_qpa_avg');

    SFI_qpa_avg = _.map(sfi_stats, function(stats) {
      return stats.qpa_avg.toFixed(2)
    })
    SFI_qpa_avg.unshift('SFI_qpa_avg');

    RTS_qpa_avg = _.map(rts_stats, function(stats) {
      return stats.qpa_avg.toFixed(2)
    })
    RTS_qpa_avg.unshift('RTS_qpa_avg');

    // -------------------------------------------------------

    var solutions = ['CD', 'CRM', 'CSO', 'DMS', 'F&I', 'RTS'];

    var chart = c3.generate({
      bindto: '#qpa_all_solutions_custom_range_bar_chart',
      padding: {
        top: 10,
        bottom: 10,
        left: 70
      },
      data: {
        columns: [
          ['QPA Counts by Solution', CD_qpa_count, CRM_qpa_count, CSO_qpa_count, DMS_qpa_count, SFI_qpa_count, RTS_qpa_count]
        ],
        type: 'bar',
        labels: true
      },
      axis: {
        x: {
          type: 'category',
          categories: solutions
        }
      },
      bar: {
        width: {
          ratio: 0.5
          //max: 30
        }
      },
      grid: {
        x: {
          show: true
        },
        y: {
          show: true
        },
        focus: {
          show: true
        }
      }
    });
  }
};

module.exports = qpa_all_solutions_custom_range_bar_chart;
