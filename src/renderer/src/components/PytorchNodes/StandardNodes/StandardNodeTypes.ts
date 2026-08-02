//ノードの定義データの共通化
export type PytorchNodeDefinition<DefaultProperties=Record<string,unknown>>={
    nodeType:string,//ノードの種類,
    inputNum:number,//入力の数
    outputNum:number,//出力の数
    properties:DefaultProperties,//ノードのプロパティ プロパティテーブルからいつでも変更,追加できる
}
//各ノードコンポーネントが満たすべき型
//export type PytorchNodeComponent=(props:PytorchNodeProps)=>(JSX);