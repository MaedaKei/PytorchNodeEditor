//ノードのプロパティの型
export type PytorchNodeProperty=Record<string,unknown>;
//ノードの定義データの共通化
export type PytorchNodeDefinition<DefaultProperties=PytorchNodeProperty>={
    /* 各ノードの見た目に関わる部分*/
    nodeType:string,//ノードの種類,
    inputNum:number,//入力の数
    outputNum:number,//出力の数
    /* 各ノードのプロパティのデフォルト値、このプロパティはテーブルから削除できない*/
    defaultProperties:DefaultProperties,//
}
//各ノードコンポーネントが満たすべき型
//export type PytorchNodeComponent=(props:PytorchNodeProps)=>(JSX);