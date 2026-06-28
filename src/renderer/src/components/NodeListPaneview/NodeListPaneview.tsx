import {PaneviewReact,type PaneviewReadyEvent} from "dockview";
import Styles from "./NodeListPaneview.module.css";

import StandardNodesPane from "../PytorchNodes/StandardNodes/StandardNodesPane";
const DummyPaneviewComponent=()=>{
    return (
        <h6>Paneview from Components</h6>
    );
};

const ComponentDictionary={
    StandardNodePane:StandardNodesPane,
    CustomNodePane:DummyPaneviewComponent,
};

export default function NodeListPaneview(){
    const onReady=(event:PaneviewReadyEvent)=>{
        const API=event.api;
        API.addPanel({
            id:"StandardNodePane",
            component:"StandardNodePane",
            title:"Standard"
        });
        API.addPanel({
            id:"CustomNodePane",
            component:"CustomNodePane",
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