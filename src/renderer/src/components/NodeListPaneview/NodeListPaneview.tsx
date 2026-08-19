import {PaneviewReact,type PaneviewReadyEvent} from "dockview";
import Styles from "./NodeListPaneview.module.css";

import StandardNodesPane from "./StandardNodePane/StandardNodesPane";
import CustomNodesPane from "./CustomNodePane/CustomNodesPane";
import UtilityNodesPane from "./UtilityNodepane/UtilityNodesPane";
const DummyPaneviewComponent=()=>{
    return (
        <h6>Paneview from Components</h6>
    );
};

const ComponentDictionary={
    StandardNodePane:StandardNodesPane,
    CustomNodePane:CustomNodesPane,
    UtilityNodePane:UtilityNodesPane,
};

export default function NodeListPaneview(){
    const onReady=(event:PaneviewReadyEvent)=>{
        const API=event.api;
        API.addPanel({
            id:"StandardNodePane",
            component:"StandardNodePane",
            title:"Standard Node"
        });
        API.addPanel({
            id:"CustomNodePane",
            component:"CustomNodePane",
            title:"Custom Node",
        });
        API.addPanel({
            id:"UtilityNodePane",
            component:"UtilityNodePane",
            title:"Utility Node"
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