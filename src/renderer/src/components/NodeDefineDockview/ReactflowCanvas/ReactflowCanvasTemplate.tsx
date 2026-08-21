import {useState, useCallback} from "react";
/* 
Controlsはミニマップやズーム、リフレームボタン
Bacgroundは背景を導入する
ズーム、パン機能自体は標準であるっぽい
*/
import { ReactFlow,Controls,Background,useNodesState,useEdgesState,addEdge,useReactFlow,ReactFlowProvider, Connection, reconnectEdge } from "@xyflow/react";
import { Node,Edge } from "@xyflow/react";
import { CanvasNode as Conv2dNode, DefaultData as Conv2dDefaultData} from "../../PytorchNodes/StandardNodes/Conv2d/Conv2dNode";
import { CanvasNode as LinearNode, DefaultData as LinearDefaultData} from "../../PytorchNodes/StandardNodes/Linear/LinearNode";
import "@xyflow/react/dist/style.css";
import "./ReactflowCanvasTemplate.css";
import { PytorchNode } from "../../PytorchNodes/StandardNodeTypes";
import { usePytorchGraphStore} from "../../../store/PytrochGraphState";
/*
カスタムノードをノードとして登録してみる
*/
const nodeTypes={
    Conv2d:Conv2dNode,
    Linear:LinearNode,
}
const DefaultDataRegistry={
    Conv2d:Conv2dDefaultData,
    Linear:LinearDefaultData,
}
//オブジェクトのKeyをチェックして保証する関数
function isValidPytorchModule(key:string):key is keyof typeof DefaultDataRegistry{
    return key in DefaultDataRegistry;
}
/* サンプルコードを実行してみる*/
//const initialNodes:PytorchNode[]=[];

//const initialEdges:Edge[]=[];
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
function getNodeId(pytorchModule:string){
    //NodeTypeのKeyが存在しない場合は初期化する
    if(!(pytorchModule in idCountObject)){
        idCountObject[pytorchModule]=0;
    }
    const Id=idCountObject[pytorchModule];
    idCountObject[pytorchModule]+=1;
    return `${pytorchModule}_${Id}`;
}
function ReactflowCanvasInner(){
    //const [nodes,setNodes,onNodesChange]=useNodesState(initialNodes);
    //const [edges,setEdges,onEdgesChange]=useEdgesState(initialEdges);
    //Zustandのものを使ってみる
    const nodes=usePytorchGraphStore((state)=>state.nodes);
    const setNodes=usePytorchGraphStore((state)=>state.setNodes);
    const onNodesChange=usePytorchGraphStore((state)=>state.onNodesChange);
    const edges=usePytorchGraphStore((state)=>state.edges);
    //const setEdges=usePytorchGraphStore((state)=>state.setEdges);
    const onEdgesChange=usePytorchGraphStore((state)=>state.onEdgesChange);

    const onConnect=usePytorchGraphStore((state)=>state.onConnect);
    const onReconnect=usePytorchGraphStore((state)=>state.onReconnect);

    const {screenToFlowPosition}=useReactFlow();
    /*
    //接続処理
    const onConnect=useCallback((connection:Connection)=>{
        setEdges((eds)=>addEdge(connection,eds));
    },[setEdges]);
    //接続修正処理
    const onReconnect=useCallback((oldEdge:Edge,newConnection:Connection)=>{
        setEdges((eds)=>reconnectEdge(oldEdge,newConnection,eds));
    },[setEdges]);
    */
    //Dropイベントを許可する門番的なモノ
    const onDragOver=useCallback((event:React.DragEvent)=>{
        event.preventDefault();
        event.dataTransfer.dropEffect="move";
    },[]);
    //Dropによるノード追加
    const onDrop=useCallback((event:React.DragEvent)=>{
        event.preventDefault();
        const pytorchModule=event.dataTransfer.getData("application/reactflow");
        //チェックエリア
        if(!pytorchModule)return;//Paneview以外からのドロップは無視する
        if(!isValidPytorchModule(pytorchModule))return;//PaneviewからのドロップだけどDefaultDataRegistryにない＝importされてな可能性あり


        const position=screenToFlowPosition({
            x:event.clientX,
            y:event.clientY,
        });
        const newNodeID=getNodeId(pytorchModule);
        const newNode:PytorchNode={
            id:newNodeID,
            type:pytorchModule,
            position,
            data:DefaultDataRegistry[pytorchModule]
        } 

        setNodes((nds)=>nds.concat(newNode));//setNodesに関数を渡した場合は「setNodesが呼ばれた"その瞬間"に、Reactが把握している、最新のnodes配列」がndsに自動で入る。
    },[screenToFlowPosition,setNodes]);
    return (
        <div style={{width:"100%",height:"100%"}}>
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect} 
                onReconnect={onReconnect}
                nodeTypes={nodeTypes} 
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