import { create } from "zustand"; 
import { PytorchNode } from "../components/PytorchNodes/StandardNodeTypes";
import {
    type Edge,
    type OnNodesChange,
    type OnEdgesChange,
    type OnConnect,
    type OnReconnect,
    type NodeChange,
    type EdgeChange,
    type Connection,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    reconnectEdge,
} from "@xyflow/react";

//グローバルストアの型
type ReactflowState={
    nodes:PytorchNode[],//Pytorchモジュール用のデータ型をdataにもつNode型
    edges:Edge[],
    onNodesChange:OnNodesChange<PytorchNode>,
    onEdgesChange:OnEdgesChange,
    onConnect:OnConnect,
    onReconnect:OnReconnect,
    setNodes:(nodes:PytorchNode[])=>void,
    setEdges:(edges:Edge[])=>void,
}

const useReactflowStore=create<ReactflowState>((set,get)=>({
    nodes:[],
    edges:[],
    onNodesChange:(changes)=>{
        set({nodes:applyNodeChanges(changes,get().nodes)});
    },
    onEdgesChange:(changes)=>{
        set({edges:applyEdgeChanges(changes,get().edges)});
    },
    onConnect:(connection)=>{
        set({edges:addEdge(connection,get().edges)});
    },
    onReconnect:(oldEdge,newConnection)=>{
        set({edges:reconnectEdge(oldEdge,newConnection,get().edges)});
    },
    setNodes:(nodes)=>{
        set({nodes:nodes});
    },
    setEdges:(edges)=>{
        set({edges:edges});
    }
}));