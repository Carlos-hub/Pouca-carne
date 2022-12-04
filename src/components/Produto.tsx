import { Plus } from "phosphor-react";

interface ICreateProdutos{
 id:string;
 imagem:string;
 title:string;
 description:string;
 preco:string;
}

export function Produto(props:ICreateProdutos){

 return (
  <div className="rounded-lg bg-[#361F17] text-white inline-block flex-1" key={props.id}>
   <img src={props.imagem} alt="" srcSet={props.imagem} className="w-full rounded-t-lg

" />
<div className="p-2">
   <h1>{props.title}</h1>
   <p>{props.description}</p>
   <p>{props.preco}</p>
   <button className="bg-[#C6DC6C] rounded-full"><Plus size={32} weight="bold" /></button>
</div>
  </div>
 )
}