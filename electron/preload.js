const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveImage: (name, buffer) => ipcRenderer.invoke('save-image', { name, buffer })
});