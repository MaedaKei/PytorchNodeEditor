import {PytorchNodeCanvas, PytorchNodePane} from "../../PytorchNodeBase";
import {ModuleDefinition, PytorchNodeData, PytorchNodeProps } from "../../StandardNodeTypes";
import Styles from "./Conv2dNode.module.css";
//Conv2dノードのデフォルトプロパティ
//プロパティテーブルから項目を追加・削除することができるが、ここにある項目は削除不可
//ノードがCanvasに置かれたとき、以下の項目・初期値は自動的に設定される

//nodeがCanvasに置かれたときにこれをデフォルトとしてdataにセットする
//これはノードごとに独立した設定値になる
export const DefaultData:PytorchNodeData={
    pytorchModule:"Conv2d",
    nodeProperty:{
        in_channels :2,
        out_channels :2,
        kernel_size:3,
        stride:1,
        padding:1,
    }
}
//これはpytorchModule間で共通の設定。入出力数など
export const DefaultModuleDefinition:ModuleDefinition={
    pytorchModule:DefaultData.pytorchModule,
    inputNum:1,
    outputNum:1,
}
export function CanvasNode(props:PytorchNodeProps){
    //Reactflowから渡されたnodeDataから、独自のデータプロパティであるdataを抽出して受け取る
    //ここには各ノードに設定されたプロパティが格納されている。
    // 上記はプロパティの一部で、ユーザーが設定したプロパティも入っている可能性あり。
    const pytorchNodeData=props.data;
    const nodeProperty=pytorchNodeData.nodeProperty;
    const selected=props.selected;
    return (
        <PytorchNodeCanvas 
            inputNum={DefaultModuleDefinition.inputNum}
            outputNum={DefaultModuleDefinition.outputNum}
            selected={selected}
        >
            {/* UniqueConents*/}
            <div className={Styles.nodeInfo}>
                <label>{DefaultModuleDefinition.pytorchModule}</label>
            </div>
        </PytorchNodeCanvas>
    )
}

export function PaneNode(){
    return (
        <PytorchNodePane
            inputNum={DefaultModuleDefinition.inputNum}
            outputNum={DefaultModuleDefinition.outputNum}
            pytorchModule={DefaultModuleDefinition.pytorchModule}
        >
            {/* UniqueConents*/}
            <div className={Styles.nodeInfo}>
                <label>{DefaultModuleDefinition.pytorchModule}</label>
            </div>
        </PytorchNodePane>
    )
}

