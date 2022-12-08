import axios from "axios";
import { Plus } from "phosphor-react";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
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
         id_produto:props.id,
         preco:props.preco,
         id_cliente:localStorage.getItem('id'),
         forma_pagamento:"",
         cliente_numero:"35"

      }
      try {
         axios.post("http://localhost:3333/client/delivery",body,{
            headers: {
              token:localStorage.getItem('token')
            }

         })
         .then(res =>{
            toast.success("Pedido efetuado com sucesso")
         })
         .catch(err =>{
            if(err.status == 400 || err.response.data.message == 'endereco não existe'){
               toast.error(err.response.data.message)
            }else if(err.status == 400 || err.response.data.message == 'produto não existe'){
               toast.error(err.response.data.message)
            }else if(err.status == 400 || err.response.data.message == 'Client não existe'){
               toast.error(err.response.data.message)
            }
         })
      }catch(err){
         console.log(err)
         toast.error("Erro ao efetuar pedido")
      }
   }

   function toLogin(e:any){
      e.preventDefault();
      Navigate('/login')
   }

 return (
  <div className="rounded-lg bg-[#8F6252] text-white inline-block flex-1" key={props.id}>
    <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
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