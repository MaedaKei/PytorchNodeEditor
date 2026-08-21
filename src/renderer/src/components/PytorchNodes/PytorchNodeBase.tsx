// PytorchNodeの共通部分の定義を行う
// ラッパーみたいなもの
import { ReactNode } from "react";
import { Handle,NodeProps,Position, useNodeConnections} from "@xyflow/react";
import { PytorchNodeData, PytorchNodeProps } from "./StandardNodeTypes";
import Styles from "./PytorchNodeBase.module.css";


/* 位置計算ロジック*/
function usePortPositions(inputNum:number,outputNum:number){
    const MaxHandleNum=inputNum>outputNum?inputNum:outputNum;
    const TopMargin=5;//%
    const BottomMargin=5;//%
    const HandleAreaLength=100-TopMargin-BottomMargin;//%

    const TargetHandleBoxLength=HandleAreaLength/inputNum;
    const InputHandlePositionArray=Array.from({length:inputNum}).map((_,i)=>TopMargin+TargetHandleBoxLength*(i+0.5));
    const OutputHandleBoxLength=HandleAreaLength/outputNum;
    const OutputHandlePositionArray=Array.from({length:outputNum}).map((_,i)=>TopMargin+OutputHandleBoxLength*(i+0.5));
    //MaxHandleNum,InputHandlePositionArray,OutputHandlePositionArrayを返す
    //MaxHandleNumはCSS変数として使うために返す
    return {MaxHandleNum,InputHandlePositionArray,OutputHandlePositionArray};
}
/*Canvas用PytorchNodeのHandle(本数警告付き)コンポーネント用Props*/
type CanvasNodeHandleProps={
    type:"target"|"source",
    position:Position,
    id:string,
    topPercent:number,
};
function CanvasNodeHandle({type,position,id,topPercent}:CanvasNodeHandleProps){
    const connections=useNodeConnections({handleType:type,handleId:id});
    const isWarning=connections.length>=2;//１つのハンドルに一つのエッジ。経路の分岐・合流は専用のノードで明示的に行う
    return (
        <>
            {isWarning&&(
                <span
                    className={Styles.warningBadge}
                    style={{top:`${topPercent}%`}}
                    title={`${connections.length} 本接続されています\n接続は 1 本までです`}
                >
                    !
                </span>
            )}
            <Handle
                className={Styles.nodeHandle}
                type={type}
                position={position}
                style={{top:`${topPercent}%`}}
                id={id}
                key={id}
            />
        </>
    )
}
/* PytorchNodeBase */
type NodePropsBase={
    inputNum:number,
    outputNum:number,
    children:ReactNode,
}
type CanvasNodeProps=NodePropsBase&{
    selected:boolean,//select状態を受け取るため
}

//Canvas用のPytorchNodeフレーム
export function PytorchNodeCanvas({inputNum=1,outputNum=1,children=<></>,selected=false}:CanvasNodeProps){
    const {MaxHandleNum,InputHandlePositionArray,OutputHandlePositionArray}=usePortPositions(inputNum,outputNum);
    return (
        <div className={`${Styles.pytorchNodeBase} ${selected?Styles.selected:""}`}style={{"--handleNum":MaxHandleNum} as React.CSSProperties}>
            <div className={Styles.inputContainer}>{/* targetハンドラをまとめた部分 */}
                {
                    InputHandlePositionArray.map((position,i)=>(
                        <CanvasNodeHandle 
                            type="target" 
                            position={Position.Left} 
                            topPercent={position}
                            id={`target_${i}`} 
                        />
                    ))
                }
            </div>
            <div className={Styles.nodeContentsContainer}>{/*Pytorchノードのコンテンツ表示部分*/}
                {children}
            </div>
            <div className={Styles.outputContainer}>{/* sourceハンドラをまとめた部分 */}
                {
                    OutputHandlePositionArray.map((position,i)=>(
                        //<Handle className={Styles.nodeHandle} type="source" position={Position.Right} style={{ top: `${position}%` }} id={`source_${i}`} key={`source_${i}`}/>
                        <CanvasNodeHandle 
                            type="source" 
                            position={Position.Right} 
                            topPercent={position}
                            id={`source_${i}`} 
                        />
                    ))
                }
            </div>
        </div>
    )
}
//Pane用のPytorchNodeフレーム
type PaneNodeProps=NodePropsBase & {
    pytorchModule:string,
}
export function PytorchNodePane({inputNum=1,outputNum=1,children=<></>,pytorchModule}:PaneNodeProps){
    const {MaxHandleNum,InputHandlePositionArray,OutputHandlePositionArray}=usePortPositions(inputNum,outputNum);
    const onDragStart=(event:React.DragEvent)=>{
        event.dataTransfer.setData("application/reactflow", pytorchModule);//HTML5のDrag&Drop APIで、ドラッグ中のデータを保持するために使う
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
/*
type CreateConfig={
    DefinitionInfo:PytorchNodeDefinition,
    UniqueContents:(props:{nodeData?:PytorchNodeData})=>ReactNode,//NodeTypeごとの固有の部分
}
export function createPytorchNode(Config:CreateConfig){
    const DefinitionInfo=Config.DefinitionInfo;
    const inputNum=DefinitionInfo.inputNum;
    const outputNum=DefinitionInfo.outputNum;
    const nodeType=DefinitionInfo.nodeType;
    return {
        //このカッコの中身はReactflowCanvasから勝手に渡されてくる情報
        Canvas:({data, selected}:PytorchNodeProps)=>(
            <PytorchNodeCanvas inputNum={inputNum} outputNum={outputNum} selected={selected}>
                <Config.UniqueContents nodeData={data}/>
            </PytorchNodeCanvas>
        ),
        Pane:()=>(
            <PytorchNodePane inputNum={inputNum} outputNum={outputNum} nodeType={nodeType}>
                <Config.UniqueContents/>
            </PytorchNodePane>
        ),
    }
}
*/