const {app, ipcMain, BrowserWindow} = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 440, 
    webPreferences: { webSecurity: false},
    frame: false,
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.webContents.openDevTools({mode:'detach'})
  mainWindow.on('closed', () => mainWindow = null);

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
