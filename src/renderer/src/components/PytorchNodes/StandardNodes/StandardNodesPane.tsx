import Styles from "./StandardNodesPane.module.css";

/* StandardNodesのインポート*/
import {Conv2dNodePane} from "./Conv2d/Conv2dNode";
import {LinearNodePane} from "./Linear/LinearNode";
/* 
Pytorchノードの一覧コンポーネント
ドラッグアンドドロップもできるようにする必要があるが、どうしようか
*/
const StandardNodes={
    Conv2d: Conv2dNodePane,
    Linear: LinearNodePane,
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