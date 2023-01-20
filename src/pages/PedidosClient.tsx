import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";

export function PedidosClient(){

  const [pedidos,setPedidos] = useState<any>([])
 const token = localStorage.getItem('token')
 const id = localStorage.getItem('id')
 const getPedidos = async () =>{
  try{
   const response = await axios.get(
    "http://localhost:3333/client/pedidos/",{
     headers: {
       token,
       id
     }
    });
   const data = response.data;
   setPedidos(data)
  }catch(error){

  }
 }
 useEffect(() =>{
  getPedidos();
 },[]);

 return (
   <div className="mx-auto bg-[#72584E] mb-1 h-[100vh]">
    <Header/>
     <h2 className="text-4xl text-center py-2 text-white"> Meus Pedidos</h2>
       {pedidos.length === 0?(
        <p>você não possui pedidos</p>
       ):(
        pedidos.map((pedido: { id: string; nome: string; preco: number; cod_pedido: string; cliente_endereco: string; forma_pagamento: string; status: string; created_at: string;  end_at:string;}) =>(
         <div key={pedido.id} className="w-5/12 bg-gray-600 mx-auto p-3 rounded-xl mb-2">
          <h3>{pedido.nome}</h3>
          {pedido.status == "pendente"?(
            <h4 className="text-yellow-400">{pedido.status}</h4>

          ):(
            <h4 className="text-green-400">{pedido.status}</h4>
          )}
          <h6>{pedido.created_at}</h6>
          {pedido.status =="Concluido"?(
           <span className="bg-blue-400">{pedido.end_at}</span>
          ):(
           <span className="bg-blue-400">{pedido.forma_pagamento}</span>
          )}
         </div>
        ))
       )}
        

   </div>
 )
}