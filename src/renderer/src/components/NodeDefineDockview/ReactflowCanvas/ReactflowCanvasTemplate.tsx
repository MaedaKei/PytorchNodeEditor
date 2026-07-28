import {useState, useCallback} from "react";
/* 
Controlsはミニマップやズーム、リフレームボタン
Bacgroundは背景を導入する
ズーム、パン機能自体は標準であるっぽい
*/
import { ReactFlow,Controls,Background,useNodesState,useEdgesState,addEdge } from "@xyflow/react";
import { Conv2dNodeOnCanvas } from "../../PytorchNodes/StandardNodes/Conv2d/Conv2dNode";
import "@xyflow/react/dist/style.css";
/*
カスタムノードをノードとして登録してみる
*/
const nodeTypes={
    Conv2d:Conv2dNodeOnCanvas,
}
/* サンプルコードを実行してみる*/
const initialNodes=[
    {
        id:"1",
        type:"input",//片方だけのノードっぽい
        data:{label:"Start"},
        position:{x:250,y:5},
    },
    {
        id:"2",
        data:{label:"Process"},
        position:{x:250,y:100},
    },
    {
        id:"conv2d",
        type:"Conv2d",
        data:{label:""},
        position:{x:350,y:150},
    },
    {
        id:"3",
        type:"output",//片方だけのノードっぽい
        data:{label:"Complate"},
        position:{x:250,y:200},
    },

];

const initialEdges=[
    {id:"e1-2",source:"1",target:"2"},
    {id:"e2-conv2d",source:"2",target:"conv2d"},
    {id:"econv2d-3",source:"conv2d",target:"3"},
];

function FlowChart(){
    const [nodes,setNodes]=useNodesState(initialNodes);
    const [edges,setEdges]=useEdgesState(initialEdges);

    //接続処理
    const onConnect=useCallback(
        (params:any)=>setEdges((eds)=>addEdge(params,eds)),
        [setEdges]
    );
    return (
        <div style={{width:"100%",height:"100%"}}>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onConnect={onConnect} fitView>
                <Controls></Controls>
                <Background></Background>
            </ReactFlow>
        </div>
    )
}

export default FlowChart;