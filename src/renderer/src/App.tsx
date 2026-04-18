//ここがアプリのエントリーポイント
// ここにメイン画面を実装していく
import { DockviewReact,type DockviewReadyEvent } from "dockview";
import { themeDark,type DockviewTheme } from "dockview";
import { PaneviewReact,type PaneviewReadyEvent } from "dockview";
import { GridviewReact,type GridviewReadyEvent } from "dockview";
import { Orientation } from "dockview";
//CSSをモジュールとして読み込む
import AppStyles from "./App.module.css";

const Theme=themeDark;
const DummyDockviewComponent=()=>{
    return (
        <h6>this is dockview</h6>
    );
}
//中央部のDockview部分のセットアップ
//ダミーとしてReactflowのタブとコードエディタのタブを設定
const DockviewComponents={
    ReactflowCanvas:DummyDockviewComponent,
    CodeEditor:DummyDockviewComponent
}
function NodeDefineComponent(){
    const onReady=(event:DockviewReadyEvent)=>{
        const API=event.api;
        //ReactflowCanvas用のPanel(グループにパネルを追加するとタブとなる的な)
        const NodeCanvasPanel=API.addPanel({
            id:"NodeCanvasPanel",
            component:"ReactflowCanvas",
            title:"ReactflowCanvas",
        });
        //上と同じグループにCodeEditorのパネルを追加
        API.addPanel({
            id:"CodeEditor",
            component:"CodeEditor",
            title:"CodeEditor",
            position:{
                referencePanel:NodeCanvasPanel,
                direction:"within"
            }
        });
    };
    return(
        <div className="NodeDefineComponent" style={{width:"100%",height:"100%"}}>
            <DockviewReact
                theme={Theme}
                components={DockviewComponents}
                onReady={onReady}
            />
        </div>
    );
}

const DummyPaneviewComponent=()=>{
    return (
        <h6>this is paneview</h6>
    )
}
const NodeListComponents={
    StandardNodeList:DummyPaneviewComponent,
    CustomNodeList:DummyPaneviewComponent,
}
function NodeListComponent(){
    const onReady=(event:PaneviewReadyEvent)=>{
        const API=event.api;
        API.addPanel({
            id:"StandardNodeList",
            component:"StandardNodeList",
            title:"StandardNodeList",
        });
        API.addPanel({
            id:"CustomNodeList",
            component:"CustomNodeList",
            title:"CustomNodeList"
        });

    };
    return (
        <div className="NodeListComponent" style={{width:"100%",height:"100%"}}>
            <PaneviewReact
                className={Theme.className}
                components={NodeListComponents}
                onReady={onReady}
            />
        </div>
    );
}

function NodeTreeComponent(){
    return (
        <div className="NodeTreeComponent" style={{width:"100%",height:"100%"}}>
            <h6>Treeview Component</h6>
        </div>
    );
}
function NodePropertyTableComponent(){
    return (
        <div className="NodePropertyTableComponent" style={{width:"100%",height:"100%"}}>
            <h6>NodePropertyTableComponent</h6>
        </div>
    );
}

//GridViewとして画面を構成
const MainLayoutComponents={
    DockviewPanel:NodeDefineComponent,
    PaneviewPanel:NodeListComponent,
    TreeviewPanel:NodeTreeComponent,
    PropertyTablePanel:NodePropertyTableComponent,
}
function MainLayout(){
    const onReady=(event:GridviewReadyEvent)=>{
        const API=event.api;
        const DockviewPanel=API.addPanel({
            id:"DockviewPanel",
            component:"DockviewPanel",
            //最小・最大幅を設定
            minimumWidth:50,
        });
        //左側のPaneviewを追加
        API.addPanel({
            id:"PaneviewPanel",
            component:"PaneviewPanel",
            position:{
                referencePanel:DockviewPanel.id,
                direction:"left",
            },
            size:150,//leftに配置なので、個々の値は横幅を表すことになる
            minimumWidth:50,
            maximumWidth:200,
        });
        //右側上方にtreeviewを追加
        const TreeviewPanel=API.addPanel({
            id:"TreeviewPanel",
            component:"TreeviewPanel",
            position:{
                referencePanel:DockviewPanel.id,
                direction:"right",
            },
            size:150,
            minimumWidth:50,
            maximumWidth:250,
            minimumHeight:50,
        });
        //右側下方にPropertyテーブルを追加
        API.addPanel({
            id:"PropertyTablePanel",
            component:"PropertyTablePanel",
            position:{
                referencePanel:TreeviewPanel.id,
                direction:"below",
            },
            size:300,
            minimumWidth:50,
            maximumWidth:250,
            minimumHeight:50,
        });
    };
    return (
        <div className={Theme.className} style={{width:"100%",height:"100%"}}>
            <GridviewReact
                className={Theme.className}
                components={MainLayoutComponents}
                onReady={onReady}
                orientation={Orientation.HORIZONTAL}
            />
        </div>
    )
}
export default function App(){
    return (
        <div className={AppStyles.container}>
            <MainLayout />
        </div>
    );
}