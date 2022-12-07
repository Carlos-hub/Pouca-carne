import axios from "axios";
import { useEffect, useState } from "react"
import { HeaderAdm } from "../components/HeaderAdm";
import { ListPedidos } from "../components/ListPedidos";
export function Pedidos(){

 const [pedidos,setPedidos] = useState<any>([])
 const token = localStorage.getItem('token')
 const getPedidos = async () =>{
  try{
   const response = await axios.get(
    "http://localhost:3333/client/pedidos",{
     headers: {
       token
     }
    });
   const data = response.data;
   setPedidos(data)
   console.log(data)
  }catch(error){
   console.log(error);
  }
 }
 useEffect(() =>{
  getPedidos();
 },[]);

 return (
   <div className="mx-auto bg-[#72584E]">
    <HeaderAdm/>
     <h2 className="text-4xl text-center py-2 text-white">Pedidos</h2>
       {pedidos.length === 0?(
        <p>você não possui pedidos</p>
       ):(
        pedidos.map((pedido: { id: string; nome: string; preco: number; cod_pedido: string; cliente_endereco: string; forma_pagamento: string; status: string; created_at: string; }) =>(
         <ListPedidos key={pedido.id} id={pedido.id} nome={pedido.nome} preco={pedido.preco} cod_pedido={pedido.cod_pedido} cliente_endereco={pedido.cliente_endereco} forma_pagamento={pedido.forma_pagamento} status={pedido.status} created_at={pedido.created_at}/>
        ))
       )}
        

   </div>
 )
}