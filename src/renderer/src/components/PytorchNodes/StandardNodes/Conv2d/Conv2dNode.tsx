import {PytorchNodeBaseOnCanvas,PytorchNodeBaseOnDisplay} from "../../PytorchNodeBase";
import Styles from "./Conv2dNode.module.css";

export function Conv2dNodeOnCanvas(){
    const NodeType="Conv2d";
    const InputNum=1;
    const OutputNum=1;
    /*
    Conv2dの固有プロパティを決める
    Pytorchのプロパティ名に準拠させる
    プロパティを網羅するのは無理なので、プロパティテーブルから名前、値を設定できるようにするが
    デフォルトで設定されていた方が便利なモノはこっちで一応書いておく
    プロパティテーブルでは自由に属性名を編集したり消したりできるが、
    絶対に削除も編集もさせたくないものをこちらに書くこととする。
    Conv2dの場合は以下のものとした
    */
    //Propertyテーブルと連動させるためにこのしたのオブジェクトはuseStateとしてstoreにいくはず
    //コード化するまでの仮のIDを設定し、これとプロパティオブジェクトを紐づける感じにしたい
    const DefaultProperties={
        inch:2,
        outch:2,
        ksize:3,
        padding:1,
        stride:1
    };
    //ノードには入出力チャンネルなどのみ表示させる
    return (
        <PytorchNodeBaseOnCanvas InputNum={InputNum} OutputNum={OutputNum}>
            <div className={Styles.Conv2dInfo}>
                <h3 className="NodeTypeText">{NodeType}</h3>
                <h3 className="IOchText">{`${DefaultProperties.inch} -> ${DefaultProperties.outch}`}</h3>
            </div>
        </PytorchNodeBaseOnCanvas>
    )
}

export function Conv2dNodeOnDisplay(){
    const NodeType="Conv2d";
    const InputNum=1;
    const OutputNum=1;
    /*
    Conv2dの固有プロパティを決める
    Pytorchのプロパティ名に準拠させる
    プロパティを網羅するのは無理なので、プロパティテーブルから名前、値を設定できるようにするが
    デフォルトで設定されていた方が便利なモノはこっちで一応書いておく
    プロパティテーブルでは自由に属性名を編集したり消したりできるが、
    絶対に削除も編集もさせたくないものをこちらに書くこととする。
    Conv2dの場合は以下のものとした
    */
    //Propertyテーブルと連動させるためにこのしたのオブジェクトはuseStateとしてstoreにいくはず
    //コード化するまでの仮のIDを設定し、これとプロパティオブジェクトを紐づける感じにしたい
    const DefaultProperties={
        inch:2,
        outch:2,
        ksize:3,
        padding:1,
        stride:1
    };
    //ノードには入出力チャンネルなどのみ表示させる
    return (
        <PytorchNodeBaseOnDisplay InputNum={InputNum} OutputNum={OutputNum}>
            <div className={Styles.Conv2dInfo}>
                <h6 className="NodeTypeText">{NodeType}</h6>
                <h6 className="IOchText">{`${DefaultProperties.inch} -> ${DefaultProperties.outch}`}</h6>
            </div>
        </PytorchNodeBaseOnDisplay>
    )
}