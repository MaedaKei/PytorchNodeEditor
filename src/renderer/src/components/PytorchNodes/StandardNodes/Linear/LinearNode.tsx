import {createPytorchNode} from "../../PytorchNodeBase";
import {PytorchNodeDefinition} from "../StandardNodeTypes";
import Styles from "./LinearNode.module.css";
//Conv2dノードのデフォルトプロパティ
//プロパティテーブルから項目を追加・削除することができるが、ここにある項目は削除不可
//ノードがCanvasに置かれたとき、以下の項目・初期値は自動的に設定される
type DefaultProperties={
    inch:number,
    outch:number,
}

const NodeDefinition:PytorchNodeDefinition<DefaultProperties>={
    //以下の３つの項目は、カスタムノードでは変動する可能性あり
    nodeType:"Linear",
    inputNum:1,
    outputNum:1,
    //defaultPropertiesは、Nodesのdataプロパティに格納される。ノードがCanvasに置かれたとき、以下の項目・初期値は自動的に設定される
    defaultProperties:{
        inch:2,
        outch:2,
    }
}

function UniqueContents(){
    return (
        <div className={Styles.LinearInfo}>
            <label>{NodeDefinition.nodeType}</label>
        </div>
    )
}
export const {Pane:LinearNodePane,Canvas:LinearNodeCanvas}=createPytorchNode({
    NodeType:NodeDefinition.nodeType,
    InputNum:NodeDefinition.inputNum,
    OutputNum:NodeDefinition.outputNum,
    UniqueContents:() => <UniqueContents/>,
});