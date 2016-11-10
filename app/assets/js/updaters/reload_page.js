var remote = require('electron').remote;

function reload_page () {
  var refresh = remote.getCurrentWindow().reload();
  return refresh
}

module.exports = reload_page
