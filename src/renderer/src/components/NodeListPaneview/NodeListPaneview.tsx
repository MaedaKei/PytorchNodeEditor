import {PaneviewReact,type PaneviewReadyEvent} from "dockview";
import Styles from "./NodeListPaneview.module.css";

const DummyPaneviewComponent=()=>{
    return (
        <h6>Paneview from Components</h6>
    );
};
const ComponentDictionary={
    StandardNodeList:DummyPaneviewComponent,
    CustomNodeList:DummyPaneviewComponent,
};

export default function NodeListPaneview(){
    const onReady=(event:PaneviewReadyEvent)=>{
        const API=event.api;
        API.addPanel({
            id:"StandardNodeList",
            component:"StandardNodeList",
            title:"Standard"
        });
        API.addPanel({
            id:"CustomNodeList",
            component:"CustomNodeList",
            title:"Custom",
        });
    };
    return (
        <div className={Styles.NodeListPaneview}>
            <PaneviewReact
                components={ComponentDictionary}
                onReady={onReady}
            />
        </div>
    )

}