import Styles from "./StandardNodesPane.module.css";
/* StandardNodesのインポート*/
import Conv2dNode from "./Conv2d/Conv2dNode";
/* 
Pytorchノードの一覧コンポーネント
ドラッグアンドドロップもできるようにする必要があるが、どうしようか
*/
const DummyPaneviewComponent=()=>{
    return (
        <h6>Paneview from Components</h6>
    );
};
const StandardNodes={
    Conv2d:Conv2dNode,
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