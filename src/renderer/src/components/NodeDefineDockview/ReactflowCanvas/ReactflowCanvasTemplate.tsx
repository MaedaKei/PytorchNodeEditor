import {useState, useCallback} from "react";
import { ReactFlow,Controls,Background,useNodesState,useEdgesState,addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* サンプルコードを実行してみる*/
const initialNodes=[
    {
        id:"1",
        type:"input",
        data:{label:"Start"},
        position:{x:250,y:5},
    },
    {
        id:"2",
        data:{label:"Process"},
        position:{x:250,y:100},
    },
    {
        id:"3",
        type:"output",
        data:{label:"Complate"},
        position:{x:250,y:200},
    }
];

const initialEdges=[
    {id:"e1-2",source:"1",target:"2"},
    {id:"e2-3",source:"2",target:"3"},
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
            <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect} fitView>
                <Controls/>
                <Background/>
            </ReactFlow>
        </div>
    )
}

export default FlowChart;