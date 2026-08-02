// PytorchNodeの共通部分の定義を行う
// ラッパーみたいなもの
import { ReactNode } from "react";
import { useContext } from "react";
import { NodeEnvContext } from "../NodeDefineDockview/ReactflowCanvas/NodeEnvContext";
import { Handle,Position} from "@xyflow/react";
import Styles from "./PytorchNodeBase.module.css";


/* 位置計算ロジック*/
function usePortPositions(InputNum:number,OutputNum:number){
    const MaxHandleNum=InputNum>OutputNum?InputNum:OutputNum;
    const TopMargin=5;//%
    const BottomMargin=5;//%
    const HandleAreaLength=100-TopMargin-BottomMargin;//%

    const InputHandleBoxLength=HandleAreaLength/InputNum;
    const InputHandlePositionArray=Array.from({length:InputNum}).map((_,i)=>TopMargin+InputHandleBoxLength*(i+0.5));

    const OutputHandleBoxLength=HandleAreaLength/OutputNum;
    const OutputHandlePositionArray=Array.from({length:OutputNum}).map((_,i)=>TopMargin+OutputHandleBoxLength*(i+0.5));
    //MaxHandleNum,InputHandlePositionArray,OutputHandlePositionArrayを返す
    //MaxHandleNumはCSS変数として使うために返す
    return {MaxHandleNum,InputHandlePositionArray,OutputHandlePositionArray};
}

/* Handleコンポーネント(描画切り替え機能付き)*/
type NodeHandle={
    type:"source"|"target",
    topPercent:number,
    id:string,
}
function Nodehandle({type,topPercent,id}:NodeHandle){
    const isOnCanvas=useContext(NodeEnvContext);//Canvas上にあるかPane上にあるかをチェックする
    if(isOnCanvas){
        return <Handle className={Styles.nodeHandle} id={id} type={type} position={type==="source"?Position.Right:Position.Left} style={{ top: `${topPercent}%` }}/>;
    }else{
        return <div className={Styles.nodeHandle} style={{ top: `${topPercent}%` }}/>;
    }
}

/* PytorchNodeBase */
type PytorchNodeBaseProps={
    InputNum:number,
    OutputNum:number,
    children:ReactNode,//NodeTypeごとの固有の部分
}
function PytorchNodeBase({InputNum=1,OutputNum=1,children=<></>}:PytorchNodeBaseProps){
    const {MaxHandleNum,InputHandlePositionArray,OutputHandlePositionArray}=usePortPositions(InputNum,OutputNum);
    return (
        <div className={Styles.pytorchNodeBase} style={{"--handleNum":MaxHandleNum} as React.CSSProperties}>
            <div className={Styles.inputContainer}>{/* targetハンドラをまとめた部分 */}
                {
                    InputHandlePositionArray.map((position,i)=>(
                        <Nodehandle type="target" topPercent={position} id={`target_${i}`} key={`target_${i}`}/>
                    ))
                }
            </div>
            <div className={Styles.nodeContentsContainer}>{/*Pytorchノードのコンテンツ表示部分*/}
                {children}
            </div>
            <div className={Styles.outputContainer}>{/* sourceハンドラをまとめた部分 */}
                {
                    OutputHandlePositionArray.map((position,i)=>(
                        <Nodehandle type="source" topPercent={position} id={`source_${i}`} key={`source_${i}`}/>
                    ))
                }
            </div>
        </div>
    )
}
/* ここで外に公開*/
export default PytorchNodeBase;