import Styles from "./UtilityNodesPane.module.css";
/* 
カスタムノードPaneには、サブクラス定義を開始するためのボタンの領域と、
各プロジェクトでユーザーが定義したノードが一覧表示される。
最初はボタンのみがある状態
*/
export default function UtilityNodesPane(){
    return (
        <div className={Styles.UtilityNodesPane}>
            <div className={Styles.UtilityNodesContainer}>
                
            </div>
        </div>
    )
}