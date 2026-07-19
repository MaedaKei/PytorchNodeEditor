import Styles from "./CustomNodesPane.module.css";
/* 
カスタムノードPaneには、サブクラス定義を開始するためのボタンの領域と、
各プロジェクトでユーザーが定義したノードが一覧表示される。
最初はボタンのみがある状態
*/
export default function CustomNodesPane(){
    return (
        <div className={Styles.CustomNodesPane}>
            <div className={Styles.CustomNodesContainer}>
                
            </div>
        </div>
    )
}