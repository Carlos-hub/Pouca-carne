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
   function toShop(e: MouseEvent<Element, MouseEvent>){
      e.preventDefault();
      Navigate('/shop')
   }
   function toLogin(e: MouseEvent<Element, MouseEvent>){
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