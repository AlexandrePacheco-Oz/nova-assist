const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 450,
    height: 700,
    resizable: false,
    frame: false, // App sem bordas, estilo AnyDesk
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
  
  // Mantém o app sempre no topo se necessário
  win.setAlwaysOnTop(true, 'screen-saver');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Listener para comandos de controle remoto (Mouse/Teclado)
ipcMain.on('remote-control', (event, data) => {
    // Aqui processaremos os cliques e movimentos do mouse
    // Para controle total, o usuário rodará 'npm install robotjs'
    console.log("Comando de controle recebido:", data);
});
