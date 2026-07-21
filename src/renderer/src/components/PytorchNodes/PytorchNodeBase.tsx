// PytorchNodeの共通部分の定義を行う
// ラッパーみたいなもの
import { ReactNode } from "react";
import { Handle,Position} from "@xyflow/react";
import Styles from "./PytorchNodeBase.module.css";
type PytorchNodeBaseProps={
    InputNum:number,
    OutputNum:number,
    children:ReactNode,//NodeTypeごとの固有の部分
}
export function PytorchNodeBaseOnCanvas({InputNum=1,OutputNum=1,children=<></>}:PytorchNodeBaseProps){
    //InputNum,OutputNumの個数に応じてHandleの数が変化する
    /*
    検討事項1
    ハンドル数が増えた場合にノードの高さも動的に変動させて、ハンドルが他のハンドルとかぶらないようにしなければならない
    各ハンドル群用となるコンテナdivを用意して制御するか、直接パーセンテージをスタイルに打ち込むか
    divで分離して制御を採用
    検討事項2
    CSSモジュールに分離するか、ここにstyleを直で書くか
    propsの部分はCSS変数をこちらから書き換えることで反映可能。
    個人的にはここにCSSを書くとコンポーネントが見づらくなると感じている。
    その場合、InputNumとOutputNumをCSS側にも渡す→多いほうを基準としてノードの高さを調整という流れになる
    ハンドラは等間隔で並べるようにCSSで設定する
    */
    
    //InputNumとOutputNumで大きいほうを求めておく
    const MaxHandleNum=InputNum>OutputNum?InputNum:OutputNum;
    //このPytorchNodeがどこから呼び出されたかで表示方法を変える
    return (
        <div className={Styles.pytorchNodeBase} draggable="true" style={{"--HandleNum":MaxHandleNum} as React.CSSProperties}>
            <div className={Styles.handleContainer}>{/* targetハンドラをまとめた部分 */}
                {
                    /*InputNumに応じた個数となるtargetのHandleを描画*/
                    /*個数に応じてハンドラの位置が調節されるよう、それに関するスタイルはCSSではなくこちらで設定する*/
                    Array.from({length:InputNum}).map((_,i)=>(
                        <Handle className={Styles.nodeHandle} key={`target_${i}`} type="target" position={Position.Left}/>
                    ))
                }
            </div>

            <div className={Styles.nodeContentsContainer}>{/*Pytorchノードのコンテンツ表示部分*/}
                {children}
            </div>

            <div className={Styles.handleContainer}>{/* sourceハンドラをまとめた部分 */}
                {
                    /*OutputNumに応じた個数となるsourceのHandleを描画*/
                    /*個数に応じてハンドラの位置が調節されるよう、それに関するスタイルはCSSではなくこちらで設定する*/
                    Array.from({length:OutputNum}).map((_,i)=>(
                        <Handle className={Styles.nodeHandle} key={`source_${i}`} type="source" position={Position.Right}/>
                    ))
                }
            </div>
        </div>
    );
}

export function PytorchNodeBaseOnPane({InputNum=1,OutputNum=1,children=<></>}:PytorchNodeBaseProps){
    const MaxHandleNum=InputNum>OutputNum?InputNum:OutputNum;
    //このPytorchNodeがどこから呼び出されたかで表示方法を変える
    return (
        <div className={Styles.pytorchNodeBase} draggable="true" style={{"--handleNum":MaxHandleNum} as React.CSSProperties}>

            <div className={Styles.nodeContentsContainer}>{/*Pytorchノードのコンテンツ表示部分*/}
                {children}
            </div>
            
            <div className={Styles.inputContainer}>{/* targetハンドラをまとめた部分 */}
                {
                    /*InputNumに応じた個数となるtargetのHandleを描画*/
                    /*個数に応じてハンドラの位置が調節されるよう、それに関するスタイルはCSSではなくこちらで設定する*/
                    Array.from({length:InputNum}).map((_,i)=>(
                        <div/>
                    ))
                }
            </div>

            <div className={Styles.outputContainer}>{/* sourceハンドラをまとめた部分 */}
                {
                    /*OutputNumに応じた個数となるsourceのHandleを描画*/
                    /*個数に応じてハンドラの位置が調節されるよう、それに関するスタイルはCSSではなくこちらで設定する*/
                    Array.from({length:OutputNum}).map((_,i)=>(
                        <div/>
                    ))
                }
            </div>
        </div>
    );
}