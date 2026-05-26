// PytorchNodeの共通部分の定義を行う
import { ReactNode } from "react";
import { Handle,Position} from "@xyflow/react";
type PytorchNodeBaseProps={
    NodeType:string,
    InputNum:number,
    OutputNum:number,
    children:ReactNode,//NodeTypeごとの固有の部分
}
export default function PytorchNodeBase({NodeType="Convolution",InputNum=1,OutputNum=1,children=<></>}:PytorchNodeBaseProps){
    //InputNum,OutputNumの個数に応じてHandleの数が変化する
    return (
        <div>
            {
                /*InputNumに応じた個数となるtargetのHandleを描画*/
                Array.from({length:InputNum}).map((_,i)=>(
                    <Handle key={i} type="target" position={Position.Left}/>
                ))
            }
            <p>{NodeType}</p>
            {children}
            {
                /*OutputNumに応じた個数となるsourceのHandleを描画*/
                Array.from({length:OutputNum}).map((_,i)=>(
                    <Handle key={i} type="source" position={Position.Right}/>
                ))
            }
        </div>
    );
}