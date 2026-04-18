import {PaneviewReact,type PaneviewReadyEvent} from "dockview";
import NodeListPaneviewStyles from "./NodeListPaneview.module.css";

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
            title:"StandardNodeList"
        });
        API.addPanel({
            id:"CustomNodeList",
            component:"CustomNodeList",
            title:"CustomNodeList",
        });
    };
    return (
        <div className={NodeListPaneviewStyles.NodeListPaneview}>
            <PaneviewReact
                components={ComponentDictionary}
                onReady={onReady}
            />
        </div>
    )

}