import PytorchNodeBase from "../../PytorchNodeBase";
import {PytorchNodeDefinition} from "../StandardNodeTypes";
import Styles from "./Conv2dNode.module.css";
type Conv2dDefaultProperties={
    inch:number,
    outch:number,
    ksize:number,
    padding:number,
    stride:number,
}

export const Conv2dNodeDefinition:PytorchNodeDefinition<Conv2dDefaultProperties>={
    nodeType:"Conv2d",
    inputNum:1,
    outputNum:1,
    properties:{
        inch:2,
        outch:2,
        ksize:3,
        padding:1,
        stride:1,
    }
}


function Conv2dNode(){
    return (
        <PytorchNodeBase InputNum={Conv2dNodeDefinition.inputNum} OutputNum={Conv2dNodeDefinition.outputNum}>
            <div className={Styles.Conv2dInfo}>
                <label className="NodeTypeText">{Conv2dNodeDefinition.nodeType}</label>
            </div>
        </PytorchNodeBase>
    )
}

export default Conv2dNode;