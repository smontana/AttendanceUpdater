const ipc = require('electron').ipcRenderer

const print_PDF_btn = document.getElementById('qpa_print_pdf')

console.log('print_PDF_btn: ' + print_PDF_btn)

print_PDF_btn.addEventListener('click', function (event) {
  ipc.send('print-to-pdf')
})

ipc.on('wrote-pdf', function (event, path) {
  const message = `Wrote PDF to: ${path}`
  document.getElementById('pdf-path').innerHTML = message
})
