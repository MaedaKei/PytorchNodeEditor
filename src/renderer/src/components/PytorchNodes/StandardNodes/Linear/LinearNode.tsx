import {PytorchNodeCanvas, PytorchNodePane} from "../../PytorchNodeBase";
import {ModuleDefinition, PytorchNodeData, PytorchNodeProps} from "../../StandardNodeTypes";
import Styles from "./LinearNode.module.css";

export const DefaultData:PytorchNodeData={
    pytorchModule:"Linear",
    nodeProperty:{
        in_channels:10,
        out_channels:5,
    }
}

export const DefaultModuleDefinition:ModuleDefinition={
    pytorchModule:DefaultData.pytorchModule,
    inputNum:1,
    outputNum:1,
}

export function CanvasNode(props:PytorchNodeProps){
    const pytorchNodeData=props.data;
    const nodeProperty=pytorchNodeData.nodeProperty;
    const selected=props.selected;
    return (
        <PytorchNodeCanvas 
            inputNum={DefaultModuleDefinition.inputNum}
            outputNum={DefaultModuleDefinition.outputNum}
            selected={selected}
        >
            {/* UniqueConents*/}
            <div className={Styles.nodeInfo}>
                <label>{DefaultModuleDefinition.pytorchModule}</label>
            </div>
        </PytorchNodeCanvas>
    )
}

export function PaneNode(){
    return (
        <PytorchNodePane
            inputNum={DefaultModuleDefinition.inputNum}
            outputNum={DefaultModuleDefinition.outputNum}
            pytorchModule={DefaultModuleDefinition.pytorchModule}
        >
            {/* UniqueConents*/}
            <div className={Styles.nodeInfo}>
                <label>{DefaultModuleDefinition.pytorchModule}</label>
            </div>
        </PytorchNodePane>
    )
}