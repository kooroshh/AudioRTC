const { app, BrowserWindow } = require('electron')
const path = require('path')

let win = null;
function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration : true,
            contextIsolation: false,
            devTools : true
        },
    })
    win.loadFile('index.html')
    win.webContents.openDevTools()

}
app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})