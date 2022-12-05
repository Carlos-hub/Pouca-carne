import React from "react";
import ReactLoading, { LoadingType } from 'react-loading';

interface ILoading{
 type:LoadingType;
 color:string;
 height:number;
 width:number
}
export function Loading(props:ILoading){
  <ReactLoading type={props.type} color={props.color} width={props.width} height={props.height}/>
}