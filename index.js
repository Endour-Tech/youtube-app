// We import all modules here.
const { app, BrowserWindow } = require("electron");
const RPC = require("discord-rpc");
const path = require('path');
const { updateElectronApp } = require('update-electron-app');
const config = require("./src/config/config.json");
const rpc = new RPC.Client({
    transport: "ipc"
});

updateElectronApp();

// Main function. He define title and others stuff.
function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
    }
  });

  win.loadURL("https://www.youtube.com/");

  let i = 0;

  setInterval(() => {
    win.webContents.on('page-title-updated', () => {
      win.webContents.executeJavaScript('document.title')
        .then(title => {
          global.title = title; // set the title as a global variable
        });
    });
  }, 30000); // 60000 millisecondes = 1 minute

  // while (i < 1) {
  //   win.webContents.on('did-finish-load', () => {
  //     win.webContents.executeJavaScript('document.title')
  //       .then(title => {
  //         global.title = title; // set the title as a global variable
  //         console.log(title * 1); // log the title
  //       });
  //   });
  // }

}

// We create main window here.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    };
  });
});

app.on("ready", () => {

  rpc.on("ready", () => {


    setInterval(() => {
      rpc.setActivity({
        buttons: [
          { label : `Rejoignez le support`, url: `${config.discord}`}
      ],
  
        // We set all details for your rpc.
        details: `Regarde des vidéos`,
        startTimestamp: new Date(),
        largeImageKey: "youtube",
        largeImageText: `${global.title}`
          
          
      });
    }, 32000);
    // We set button.
  });

  setInterval(() => {
    rpc.login({ 
      clientId: config.clientId,
    });
  }, 31000);

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  };
});