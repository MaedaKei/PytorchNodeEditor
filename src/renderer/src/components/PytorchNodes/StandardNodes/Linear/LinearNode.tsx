import {PytorchNodeBaseOnCanvas,PytorchNodeBaseOnPane} from "../../PytorchNodeBase";
import Styles from "./LinearNode.module.css";
const DefaultProperties={
        inch:2,
        outch:2,
        ksize:3,
        padding:1,
        stride:1,
    };
export function LineNodeOnCanvas(){
    const NodeType="Linear";
    const InputNum=1;
    const OutputNum=1;
    return (
        <PytorchNodeBaseOnCanvas InputNum={InputNum} OutputNum={OutputNum}>
            <div className={Styles.LinearInfo}>
                <label>{NodeType}</label>
            </div>
        </PytorchNodeBaseOnCanvas>
    )
}

export function LineNodeOnPane(){
    const NodeType="Linear";
    const InputNum=1;
    const OutputNum=1;
    return (
        <PytorchNodeBaseOnPane InputNum={InputNum} OutputNum={OutputNum}>
            <div className={Styles.LinearInfo}>
                <label>{NodeType}</label>
            </div>
        </PytorchNodeBaseOnPane>
    )
}