import { create } from "zustand"; 
import { PytorchNode } from "../components/PytorchNodes/StandardNodeTypes";
import type { Dispatch,SetStateAction } from "react";
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
    setNodes:Dispatch<SetStateAction<PytorchNode[]>>,//公式のsetと同じ使い心地にした
    setEdges:Dispatch<SetStateAction<Edge[]>>,
}
export const usePytorchGraphStore=create<ReactflowState>((set,get)=>({
    nodes:[],
    edges:[],
    onNodesChange:(changes)=>{
        set({nodes:applyNodeChanges(changes,get().nodes)});
        console.log("onNodesChange");
    },
    onEdgesChange:(changes)=>{
        set({edges:applyEdgeChanges(changes,get().edges)});
        console.log("onEdgesChange");
    },
    onConnect:(connection)=>{
        set({edges:addEdge(connection,get().edges)});
        console.log("onConnect");
        console.log(get().edges);
    },
    onReconnect:(oldEdge,newConnection)=>{
        set({edges:reconnectEdge(oldEdge,newConnection,get().edges)});
        console.log("onReconnect");
        console.log(get().edges);
    },
    setNodes:(nodesOrUpdater)=>{
        set((state)=>({
            nodes:typeof nodesOrUpdater==="function"?nodesOrUpdater(state.nodes):nodesOrUpdater
        }));
        console.log("setNodes");
        console.log(get().nodes);
    },
    setEdges:(edgesOrUpdater)=>{
        set((state)=>({
            edges:typeof edgesOrUpdater==="function"?edgesOrUpdater(state.edges):edgesOrUpdater
        }));
        console.log("setEdges");
        console.log(get().nodes);
    },
}));