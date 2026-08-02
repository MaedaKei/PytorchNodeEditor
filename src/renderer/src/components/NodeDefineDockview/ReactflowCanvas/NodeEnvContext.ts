import {createContext } from "react";
//デフォルトではtrue=ReactflowCanvas上にあるとする
export const NodeEnvContext=createContext<boolean>(true);
//export const NodeEnvProvider=createContext({isOnCanvas:true});