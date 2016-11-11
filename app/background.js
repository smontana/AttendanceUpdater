import { app, Menu } from 'electron'
import createWindow from './lib/window'
import env from './env'
const path = require('path')
const glob = require('glob')

load_main_proc()

let mainWindow

app.on('ready', function () {
  var mainWindow = createWindow('main', {
    width: 1400,
    minWidth: 1400,
    height: 785,
    minHeight: 785,
    autoHideMenuBar: true
  })

  mainWindow.loadURL('file://' + __dirname + '/app.html')

  if (env.name !== 'production') {
    mainWindow.openDevTools()
  }
})

app.on('window-all-closed', function () {
  app.quit()
})

// Require each JS file in the main-process dir
function load_main_proc () {
  var files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
  files.forEach(function (file) {
    require(file)
  })
}
