const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:sub mit", (event, path) => {
  console.log(path);
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWindow.webContents.send("video:metadata", metadata.format.duration);
    // event.sender.send("video:metadata", metadata);
  });
});
