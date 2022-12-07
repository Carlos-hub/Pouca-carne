import axios from "axios";
import { Plus } from "phosphor-react";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
interface ICreateProdutos{
 id:string;
 imagem:string;
 title:string;
 description:string;
 preco:string;
}

export function Produto(props:ICreateProdutos){
   const Navigate = useNavigate();
   function toShop(e:any){
      e.preventDefault();
      const body ={
         id:props.id,
         preco:props.preco,
         id_cliente:localStorage.getItem('id'),
         forma_pagamento:""

      }
      const header:any = {
         token:localStorage.getItem('token')
      }
      const criaPedido =() =>{
         axios.post("https://serveless-pouca-carne-production.up.railway.app/client/delivery",body,header)
      }
      Navigate('/shop')
   }

   function toLogin(e:any){
      e.preventDefault();
      Navigate('/login')
   }

 return (
  <div className="rounded-lg bg-[#8F6252] text-white inline-block flex-1" key={props.id}>
   <img src={props.imagem} alt="" srcSet={props.imagem} className="w-full rounded-t-lg

" />
<div className="p-2">
   <h1 className="font-mono font-semibold">{props.title}</h1>
   <p className="font-light">{props.description}</p>
   <div className="grid grid-cols-2 pt-2">
   <p>{props.preco}</p>
   <div className="flex justify-end">
   {localStorage.getItem('token')?(
      <button className="bg-[#C6DC6C] rounded-full content-end"><Plus size={32} weight="bold" onClick={(e) =>toShop(e)} /></button>
   ):(
      <button className="bg-[#C6DC6C] rounded-full content-end"><Plus size={32} weight="bold" onClick={(e) =>toLogin(e)} /></button>
   )}
   </div>
   </div>
</div>
  </div>
 )
}