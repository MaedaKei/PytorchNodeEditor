import { Node, NodeProps } from "@xyflow/react"
//ノードのプロパティの型
/*
export type PytorchNodeDataField={//nodesからPythonコードを生成する時に必要になる情報
    nodeType:string,
    nodeProperty:Record<string,unknown>;//ここは{inch:5,outch:4}になったり変わったりできる。PytorchNodeごとに固有にできる
}
*/
export type PytorchNodeData={
    pytorchModule:string,
    nodeProperty:Record<string,unknown>
}

//ノードを定義するときに必要になる情報の型
export type ModuleDefinition={
    pytorchModule:string,
    inputNum:number,
    outputNum:number,
}
//Nodesの型
export type PytorchNode=Node<PytorchNodeData>
//このNodesが渡してくるPropsの型
export type PytorchNodeProps=NodeProps<PytorchNode>