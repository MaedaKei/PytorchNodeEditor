import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import {spawn,ChildProcess} from 'child_process'

// バックエンドプロセスを管理する変数
let pythonProcess: ChildProcess | null = null ;
const isDev=!app.isPackaged;
function getBackendPath():string{
    // ProjectRoot/electron/main.ts
    // ProjectRoot/backend/main.py
    if(isDev){
        // 開発環境の場合,Backendを直接さす
        return path.join(__dirname,"../../backend");
    }else{
        // 本番環境の場合
        return path.join(process.resourcesPath,"backend");
    }
}

function getPythonExecutable(backendPath:string):string{
    const platform=process.platform;
    console.log(platform);
    if(platform==="win32"){
        // venvPython
        return path.join(backendPath,"venv","Scripts","python.exe");
    }else{
        // venvPythonUnix
        return path.join(backendPath,"venv","bin","python");
    }
}

function startPythonBackend():void{
    const backendPath=getBackendPath();
    const pythonPath=getPythonExecutable(backendPath);
    pythonProcess=spawn(pythonPath,["main.py"],{
        cwd:backendPath,
        stdio:"pipe",
    });

    pythonProcess.stdout?.on("data",(data)=>{
        console.log(`[Python] ${data.toString().trim()}`);
    });
    pythonProcess.stderr?.on("data",(data)=>{
        console.error(`[Python] ${data.toString().trim()}`);
    });
    pythonProcess.on("error",(err)=>{
        console.error("Failed to start Python:",err);
    });
    pythonProcess.on("close",(code)=>{
        console.log(`Python process exited with code ${code}`);
        pythonProcess=null;
    });
    console.log("Python backend started");
}

function killPythonBackend():void{
    if(pythonProcess){
        pythonProcess.kill();
        pythonProcess=null;
    }
}
function createMainWindow():void{
    const mainWindow=new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:false,
            contextIsolation:true,
            // __dirnameは実行時のmain.jsがあるディレクトリを指すため、開発時もビルド済みの場合も正常に働く
            preload:path.join(__dirname,"preload.js"),//jsに変換されたものを指定する必要がある。このmain.tsも実行時はmain.jsで扱われる
            //preload:path.join("electron","dist",preload.js),
        },
    });
    
    // isDevをもとに読み込む先を変える必要がある
    if(isDev){
        // 開発環境の場合
        mainWindow.webContents.openDevTools({mode:"detach"});
        mainWindow.loadURL("http://localhost:5173/index.html");
    }else{
        // 本番環境の場合
        // /BuildしてTSやReactがHTMLに変換されたもの
        mainWindow.loadFile(path.join(__dirname,"..","..","frontend","dist","MainWindow.html"));//index.html以外の名前でビルドさせる方法は？
    }
}
// 準備ができたらPythonバックエンドを起動し、メインウィンドウを作成する
app.whenReady().then(()=>{
    startPythonBackend();
    createMainWindow();
    //ここ何のためのやつだ
    app.on("activate",()=>{
        if(BrowserWindow.getAllWindows().length===0){
            createMainWindow();
        }
    });
});

app.on("window-all-closed",()=>{
    killPythonBackend();
    // iOSでないならってこと？
    if(process.platform!=="darwin"){
        app.quit();
    }
});

app.on("before-quit",()=>{
    killPythonBackend();
})