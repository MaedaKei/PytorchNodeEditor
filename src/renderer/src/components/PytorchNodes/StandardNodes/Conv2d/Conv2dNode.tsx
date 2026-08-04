import {createPytorchNode} from "../../PytorchNodeBase";
import {PytorchNodeDefinition} from "../StandardNodeTypes";
import Styles from "./Conv2dNode.module.css";
//Conv2dノードのデフォルトプロパティ
//プロパティテーブルから項目を追加・削除することができるが、ここにある項目は削除不可
//ノードがCanvasに置かれたとき、以下の項目・初期値は自動的に設定される
type DefaultProperties={
    inch:number,
    outch:number,
    kernel_size:number,
    stride:number,
    padding:number,
}

const NodeDefinition:PytorchNodeDefinition<DefaultProperties>={
    //以下の３つの項目は、カスタムノードでは変動する可能性あり
    nodeType:"Conv2d",
    inputNum:1,
    outputNum:1,
    //defaultPropertiesは、Nodesのdataプロパティに格納される。ノードがCanvasに置かれたとき、以下の項目・初期値は自動的に設定される
    defaultProperties:{
        inch:2,
        outch:2,
        kernel_size:3,
        stride:1,
        padding:1,
    }
}

function UniqueContents(){
    return (
        <div className={Styles.Conv2dInfo}>
            <label>{NodeDefinition.nodeType}</label>
        </div>
    )
}
export const {Pane:Conv2dNodePane,Canvas:Conv2dNodeCanvas}=createPytorchNode({
    NodeType:NodeDefinition.nodeType,
    InputNum:NodeDefinition.inputNum,
    OutputNum:NodeDefinition.outputNum,
    UniqueContents:() => <UniqueContents/>,
});