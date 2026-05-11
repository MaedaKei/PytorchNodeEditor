import {useState,useEffect,useRef} from "react";
import Styles from "./MenuBar.module.css";
// メニューの定義
type MenuItemDef={
    type:"item";
    label:string;
    onClick:()=>void;
}|{
    type:"separator";
};
type MenuDef={
    label:string;
    items:MenuItemDef[];
};
// データ
const MENUS:MenuDef[]=[//MenuDefのリスト
    {
        label:"File",
        items:[//ここからMenuItemDefのリスト
            {type:"item",label:"New Project",onClick:()=>alert("New Project")},
            {type:"item",label:"Open Project",onClick:()=>alert("Load Project")},
            {type:"separator"},
            {type:"item",label:"Save Project",onClick:()=>alert("Save")}
        ]
    },
    {
        label:"Setting",
        items:[
            {type:"item",label:"Language",onClick:()=>alert("Language")},
            {type:"separator"},
            {type:"item",label:"BG Color",onClick:()=>alert("Dummy")},
        ]
    },
];
//ドロップダウンの部分
function Dropdown({items}:{items:MenuItemDef[]}){
    return(
        <div className={Styles.Dropdown}>
            {items.map((item,index)=>
                item.type==="separator"?(
                    <hr key={index}/>//セパレータ
                ):(
                    //ドロップダウンメニュー
                    <button key={index} onClick={item.onClick}>
                        {item.label}
                    </button>
                )
            )}
        </div>
    );
}

export default function MenuBar(){
    // どのメニューが開いているか (null=全部閉じている)
    const [openMenu,setOpenMenu]=useState<string|null>(null);
    //メニューの外側をクリックしたら閉じる
    useEffect(()=>{
        const handleOutsideClick=()=>setOpenMenu(null);
        document.addEventListener("mousedown",handleOutsideClick);
        //useEffectのreturnはこのコンポーネントが消えるときの処理
        return ()=>document.removeEventListener("mousedown",handleOutsideClick);
    },[]);
    //メニューラベルのクリック時の処理
    const handleLabelClick=(label:string,e:React.MouseEvent)=>{
        e.stopPropagation();//外側クリックによるメニューバーの終了イベントは画面全体に設定されているので、メニューバークリックのイベントが後ろ側に伝播しないようにする。
        setOpenMenu((prev)=>(prev===label?null:label));//同じラベルが押されたら閉じる、それ以外のラベルなら展開する
    };
    //メニューラベルのホバー時の処理
    const handleLabelHover=(label:string)=>{
        //すでに何かのドロップダウンが開いている時だけ切り替える
        if(openMenu!==null){
            setOpenMenu(label);
        }
    };

    return(
        <div className={Styles.MenuBar}>
            {MENUS.map((menu)=>(
                <div
                    key={menu.label}
                    onMouseDown={(e)=>handleLabelClick(menu.label,e)}
                    onMouseEnter={()=>handleLabelHover(menu.label)}
                >
                    <button>{menu.label}</button>
                    {
                        //booleanと<html>を&&とすることで、条件一致時にのみ描画されるようにする
                        openMenu===menu.label&&<Dropdown items={menu.items}/>
                    }
                </div>
            ))}
        </div>
    );
}