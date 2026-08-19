import Styles from "./StandardNodesPane.module.css";

/* StandardNodesのインポート*/
import {PaneNode as Conv2dNode} from "../../PytorchNodes/StandardNodes/Conv2d/Conv2dNode";
import {PaneNode as LinearNode} from "../../PytorchNodes/StandardNodes/Linear/LinearNode";
/* 
Pytorchノードの一覧コンポーネント
ドラッグアンドドロップもできるようにする必要があるが、どうしようか
*/
const StandardNodes={
    Conv2d: Conv2dNode,
    Linear: LinearNode,
}
export default function StandardNodesPane(){
    /* importした標準ノードを一覧として表示する*/
    return (
        <div className={Styles.StandardNodesPane}>
            {
                /* オブジェクトに登録したノードをループで全表示させる */
                Object.entries(StandardNodes).map(([NodeType,NodeComponent])=>(
                    <NodeComponent/>
                ))
            }
        </div>
    )
}