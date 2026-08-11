import {useState, useCallback} from "react";
/* 
Controlsはミニマップやズーム、リフレームボタン
Bacgroundは背景を導入する
ズーム、パン機能自体は標準であるっぽい
*/
import { ReactFlow,Controls,Background,useNodesState,useEdgesState,addEdge,useReactFlow,ReactFlowProvider, Connection, reconnectEdge } from "@xyflow/react";
import { Node,Edge } from "@xyflow/react";
import { Conv2dNodeCanvas} from "../../PytorchNodes/StandardNodes/Conv2d/Conv2dNode";
import { LinearNodeCanvas } from "../../PytorchNodes/StandardNodes/Linear/LinearNode";
import "@xyflow/react/dist/style.css";
import "./ReactflowCanvasTemplate.css";
/*
カスタムノードをノードとして登録してみる
*/
const nodeTypes={
    Conv2d:Conv2dNodeCanvas,
    Linear:LinearNodeCanvas,
}
/* サンプルコードを実行してみる*/
type PytorchNodeProperties=Record<string,unknown>;
type NodeInfomation=Node<PytorchNodeProperties>
const initialNodes:NodeInfomation[]=[];

const initialEdges:Edge[]=[];
/*
function FlowChart(){
    const [nodes,setNodes,onNodesChange]=useNodesState(initialNodes);
    const [edges,setEdges,onEdgesChange]=useEdgesState(initialEdges);

    //接続処理
    const onConnect=useCallback(
        (connection:any)=>setEdges((eds)=>addEdge(connection,eds)),
        [setEdges]
    );
    return (
        <div style={{width:"100%",height:"100%"}}>
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes} 
                onConnect={onConnect} 
                fitView
                snapGrid={[10,10]}
            >
                <Controls></Controls>
                <Background></Background>
            </ReactFlow>
        </div>
    )
}

export default FlowChart;
*/
let idCountObject:Record<string,number>={};//NodeTypeごとにidを管理するためのオブジェクト
function getNodeId(nodeType:string){
    //NodeTypeのKeyが存在しない場合は初期化する
    if(!(nodeType in idCountObject)){
        idCountObject[nodeType]=0;
    }
    const Id=idCountObject[nodeType];
    idCountObject[nodeType]+=1;
    return `${nodeType}_${Id}`;
}
function ReactflowCanvasInner(){
    const [nodes,setNodes,onNodesChange]=useNodesState(initialNodes);
    const [edges,setEdges,onEdgesChange]=useEdgesState(initialEdges);
    const {screenToFlowPosition}=useReactFlow();

    //接続処理
    const onConnect=useCallback((connection:Connection)=>{
        setEdges((eds)=>addEdge(connection,eds));
    },[setEdges]);
    //接続修正処理
    const onReconnect=useCallback((oldEdge:Edge,newConnection:Connection)=>{
        setEdges((eds)=>reconnectEdge(oldEdge,newConnection,eds));
    },[setEdges]);
    
    //Dropイベントを許可する門番的なモノ
    const onDragOver=useCallback((event:React.DragEvent)=>{
        event.preventDefault();
        event.dataTransfer.dropEffect="move";
    },[]);
    //Dropによるノード追加
    const onDrop=useCallback((event:React.DragEvent)=>{
        event.preventDefault();
        const nodeType=event.dataTransfer.getData("application/reactflow");
        if(!nodeType)return;//Paneview以外からのドロップは無視する
        const position=screenToFlowPosition({
            x:event.clientX,
            y:event.clientY,
        });
        const newNode={
            id:getNodeId(nodeType),
            type:nodeType,
            position,
            data:{label:nodeType}//今は空
        } 

        setNodes((nds)=>nds.concat(newNode));//setNodesに関数を渡した場合は「setNodesが呼ばれた"その瞬間"に、Reactが把握している、最新のnodes配列」がndsに自動で入る。
    },[screenToFlowPosition,setNodes])
    return (
        <div style={{width:"100%",height:"100%"}}>
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes} 
                onConnect={onConnect} 
                onReconnect={onReconnect}
                onDragOver={onDragOver}
                onDrop={onDrop}
                fitView
                snapGrid={[10,10]}
                defaultEdgeOptions={{animated:true}}
            >
                <Controls></Controls>
                <Background></Background>
            </ReactFlow>
        </div>
    )
}

function ReactflowCanvas(){
    return (
        <ReactFlowProvider>
            <ReactflowCanvasInner/>
        </ReactFlowProvider>
    )
}

export default ReactflowCanvas;