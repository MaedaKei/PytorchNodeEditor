import { DockviewReact,type DockviewReadyEvent } from "dockview";
import {themeDark,type DockviewTheme} from "dockview";
import FlowChart from "./ReactflowCanvas/ReactflowCanvasTemplate";
import Styles from "./NodeDefineDockview.module.css";
const DummyDockviewComponent=()=>{
    return (
        <h6>Dockview from component</h6>
    );
};
const ComponentDictionary={
    ReactflowCanvas:FlowChart,
    CodeEditor:DummyDockviewComponent,
}
export default function NodeDefineComponent(){
    const onReady=(event:DockviewReadyEvent)=>{
        const API=event.api;
        const ReactflowCanvas=API.addPanel({
            id:"ReactflowCanvas",
            component:"ReactflowCanvas",
            title:"ReactflowCanvas",
        });
        API.addPanel({
            id:"CodeEditor",
            component:"CodeEditor",
            title:"CodeEditor",
            position:{
                referencePanel:ReactflowCanvas,
                direction:"within"
            }
        });
    };
    return(
        <div className={Styles.NodeDefineDockview}>
            <DockviewReact
                theme={themeDark}
                components={ComponentDictionary}
                onReady={onReady}
            />
        </div>
    );
}