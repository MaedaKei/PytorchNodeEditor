import PytorchNodeBase from "../../PytorchNodeBase";
import {PytorchNodeDefinition} from "../StandardNodeTypes";
import Styles from "./LinearNode.module.css";
type LinearDefaultProperties={
    inch:number,
    outch:number,
}
export const LinearNodeDefinition:PytorchNodeDefinition<LinearDefaultProperties>={
    nodeType:"Linear",
    inputNum:1,
    outputNum:1,
    defaultProperties:{
        inch:2,
        outch:2,
    }
}

function LinearNode(){
    return (
        <PytorchNodeBase InputNum={LinearNodeDefinition.inputNum} OutputNum={LinearNodeDefinition.outputNum}>
            <div className={Styles.LinearInfo}>
                <label>{LinearNodeDefinition.nodeType}</label>
            </div>
        </PytorchNodeBase>
    )
}

export default LinearNode;