// PytorchNodeの共通部分の定義を行う
// ラッパーみたいなもの
import { ReactNode } from "react";
import { Handle,Position} from "@xyflow/react";
import Styles from "./PytorchNodeBase.module.css";
import NodeListPaneview from "../NodeListPaneview/NodeListPaneview";
type PytorchNodeBaseProps={
    InputNum:number,
    OutputNum:number,
    children:ReactNode,//NodeTypeごとの固有の部分
}
export function PytorchNodeBaseOnCanvas({InputNum=1,OutputNum=1,children=<></>}:PytorchNodeBaseProps){
    //InputNum,OutputNumの個数に応じてHandleの数が変化する
    
    //InputNumとOutputNumで大きいほうを求めておく
    const MaxHandleNum=InputNum>OutputNum?InputNum:OutputNum;
    //handle要素をここで直接％で位置を指定する
    //このPytorchNodeがどこから呼び出されたかで表示方法を変える
    const TopMargin=5;//%
    const BottomMargin=5;//%
    const HandleAreaLength=100-TopMargin-BottomMargin;//%
    
    const InputHandleBoxLength=HandleAreaLength/InputNum;
    const InputHandlePositionArray=Array.from({length:InputNum}).map((_,i)=>TopMargin+InputHandleBoxLength*(i+0.5));

    const OutputHandleBoxLength=HandleAreaLength/OutputNum;
    const OutputHandlePositionArray=Array.from({length:OutputNum}).map((_,i)=>TopMargin+OutputHandleBoxLength*(i+0.5));
    return (
        <div className={Styles.pytorchNodeBase} style={{"--handleNum":MaxHandleNum} as React.CSSProperties}>
            <div className={Styles.inputContainer}>{/* targetハンドラをまとめた部分 */}
                {
                    InputHandlePositionArray.map((position,i)=>(
                        <Handle className={Styles.nodeHandle} id={`target_${i}`} key={`target_${i}`} type="target" position={Position.Left} style={{ top: `${position}%` }}/>
                    ))
                }
            </div>
            
            <div className={Styles.nodeContentsContainer}>{/*Pytorchノードのコンテンツ表示部分*/}
                {children}
            </div>

            <div className={Styles.outputContainer}>{/* sourceハンドラをまとめた部分 */}
                {
                    OutputHandlePositionArray.map((position,i)=>(
                        <Handle className={Styles.nodeHandle} id={`source_${i}`} key={`source_${i}`} type="source" position={Position.Right} style={{ top: `${position}%` }}/>
                    ))
                }
            </div>
        </div>
    );
}

export function PytorchNodeBaseOnPane({InputNum=1,OutputNum=1,children=<></>}:PytorchNodeBaseProps){
    //InputNum,OutputNumの個数に応じてHandleの数が変化する
    
    //InputNumとOutputNumで大きいほうを求めておく
    const MaxHandleNum=InputNum>OutputNum?InputNum:OutputNum;
    //handle要素をここで直接％で位置を指定する
    //このPytorchNodeがどこから呼び出されたかで表示方法を変える
    const TopMargin=5;//%
    const BottomMargin=5;//%
    const HandleAreaLength=100-TopMargin-BottomMargin;//%
    
    const InputHandleBoxLength=HandleAreaLength/InputNum;
    const InputHandlePositionArray=Array.from({length:InputNum}).map((_,i)=>TopMargin+InputHandleBoxLength*(i+0.5));

    const OutputHandleBoxLength=HandleAreaLength/OutputNum;
    const OutputHandlePositionArray=Array.from({length:OutputNum}).map((_,i)=>TopMargin+OutputHandleBoxLength*(i+0.5));
    return (
        <div className={Styles.pytorchNodeBase} style={{"--handleNum":MaxHandleNum} as React.CSSProperties}>
            <div className={Styles.inputContainer}>{/* targetハンドラをまとめた部分 */}
                {
                    InputHandlePositionArray.map((position,i)=>(
                        <div className={Styles.nodeHandle} style={{ top: `${position}%` }}/>
                    ))
                }
            </div>
            
            <div className={Styles.nodeContentsContainer}>{/*Pytorchノードのコンテンツ表示部分*/}
                {children}
            </div>

            <div className={Styles.outputContainer}>{/* sourceハンドラをまとめた部分 */}
                {
                    OutputHandlePositionArray.map((position,i)=>(
                        <div className={Styles.nodeHandle} style={{ top: `${position}%` }}/>
                    ))
                }
            </div>
        </div>
    );
}
