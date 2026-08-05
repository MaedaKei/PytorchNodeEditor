// PytorchNodeの共通部分の定義を行う
// ラッパーみたいなもの
import { ReactNode } from "react";
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

/* PytorchNodeBase */
type PytorchNodeCanvasProps={
    InputNum:number,
    OutputNum:number,
    children:ReactNode,//NodeTypeごとの固有の部分
    selected?:boolean,//あってもなくてもいい？うけとってもうけとらなくてもいい
}
//Canvas用のPytorchNodeフレーム
export function PytorchNodeCanvas({InputNum=1,OutputNum=1,children=<></>,selected=false}:PytorchNodeCanvasProps){
    const {MaxHandleNum,InputHandlePositionArray,OutputHandlePositionArray}=usePortPositions(InputNum,OutputNum);
    return (
        <div className={`${Styles.pytorchNodeBase} ${selected?Styles.selected:""}`}style={{"--handleNum":MaxHandleNum} as React.CSSProperties}>
            <div className={Styles.inputContainer}>{/* targetハンドラをまとめた部分 */}
                {
                    InputHandlePositionArray.map((position,i)=>(
                        <Handle className={Styles.nodeHandle} type="target" position={Position.Left} style={{ top: `${position}%` }} id={`target_${i}`} key={`target_${i}`}/>
                    ))
                }
            </div>
            <div className={Styles.nodeContentsContainer}>{/*Pytorchノードのコンテンツ表示部分*/}
                {children}
            </div>
            <div className={Styles.outputContainer}>{/* sourceハンドラをまとめた部分 */}
                {
                    OutputHandlePositionArray.map((position,i)=>(
                        <Handle className={Styles.nodeHandle} type="source" position={Position.Right} style={{ top: `${position}%` }} id={`source_${i}`} key={`source_${i}`}/>
                    ))
                }
            </div>
        </div>
    )
}
//Pane用のPytorchNodeフレーム
type PytorchNodePaneProps=PytorchNodeCanvasProps & {
    nodeType:string,
}
export function PytorchNodePane({InputNum=1,OutputNum=1,children=<></>,nodeType}:PytorchNodePaneProps){
    const {MaxHandleNum,InputHandlePositionArray,OutputHandlePositionArray}=usePortPositions(InputNum,OutputNum);
    const onDragStart=(event:React.DragEvent)=>{
        event.dataTransfer.setData("application/reactflow", nodeType);//HTML5のDrag&Drop APIで、ドラッグ中のデータを保持するために使う
        event.dataTransfer.effectAllowed = "move";//ドラッグ中のカーソルの形状を指定するために使う
    }
    return (
        //PytorchNodePaneは手動でdraggableにする必要がある。
        <div className={Styles.pytorchNodeBase} style={{"--handleNum":MaxHandleNum} as React.CSSProperties} draggable onDragStart={onDragStart}>
            <div className={Styles.inputContainer}>{/* targetハンドラをまとめた部分 */}
                {
                    InputHandlePositionArray.map((position,i)=>(
                        <div className={Styles.nodeHandle} style={{ top: `${position}%` }} key={`target_${i}`}/>
                    ))
                }
            </div>
            <div className={Styles.nodeContentsContainer}>{/*Pytorchノードのコンテンツ表示部分*/}
                {children}
            </div>
            <div className={Styles.outputContainer}>{/* sourceハンドラをまとめた部分 */}
                {
                    OutputHandlePositionArray.map((position,i)=>(
                        <div className={Styles.nodeHandle} style={{ top: `${position}%` }} key={`source_${i}`}/>
                    ))
                }
            </div>
        </div>
    )
}

type CreatePytorchNodeConfig={
    NodeType:string,
    InputNum:number,
    OutputNum:number,
    UniqueContents:()=>ReactNode,//NodeTypeごとの固有の部分
}
export function createPytorchNode(Config:CreatePytorchNodeConfig){
    return {
        //このカッコの中身はReactflowCanvasから勝手に渡されてくる情報
        Canvas:({selected}:{selected?:boolean})=>(
            <PytorchNodeCanvas InputNum={Config.InputNum} OutputNum={Config.OutputNum} selected={selected}>
                <Config.UniqueContents/>
            </PytorchNodeCanvas>
        ),
        Pane:()=>(
            <PytorchNodePane InputNum={Config.InputNum} OutputNum={Config.OutputNum} nodeType={Config.NodeType}>
                <Config.UniqueContents/>
            </PytorchNodePane>
        ),
    }
}