import {app,BrowserWindow} from "electron";
import {join} from "path";

const isDev=!app.isPackaged;
function createWindow():void{
    const window=new BrowserWindow({
        width:1200,
        height:800,
        webPreferences:{
            contextIsolation:true,
            nodeIntegration:false,
            preload:join(__dirname,"../preload/index.js"),//ビルド済みのJS読み込む想定
        },
    });
    window.removeMenu();
    window.loadFile(join(__dirname,"../renderer/index.html"));
    if(isDev){
        console.log("This is developement fhase, opened DevTools on Separated Window.");
        window.webContents.openDevTools({mode:"detach"});
    }
}

app.whenReady().then(()=>{
    createWindow();
});

app.on("window-all-closed",()=>{
    if(process.platform!=="darwin"){
        app.quit();
    }
});