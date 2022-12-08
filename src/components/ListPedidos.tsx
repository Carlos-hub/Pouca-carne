import axios from "axios";

interface IGetPedidos{
 id:string;
 nome:string;
 preco:number;
 cod_pedido:string;
 cliente_endereco:string;
 forma_pagamento:string;
 status:string;
 created_at:string;
}

export function ListPedidos(props:IGetPedidos){
 

 function confirma(id:any){

  try{
     axios.post(`http://localhost:3333/company/pedidos/aprove`,{id},{
      headers:{
       token: localStorage.getItem('token'),
       id:localStorage.getItem('id')
     }})
     .then((res) =>{
          console.log(res)
      })
      .catch((err) =>{
        console.log(err)
      })
   }catch(err){
    console.log(err);
   }
 }
 function cancela(id:any){
  try{
   axios.post(`http://localhost:3333/company/pedidos/cancela`,{id},{
    headers:{
     token: localStorage.getItem('token'),
     id:localStorage.getItem('id')
   }})
   .then((res) =>{
        console.log(res)
    })
    .catch((err) =>{
      console.log(err)
    })
 }catch(err){
  console.log(err);
 }
 }

return (
 <div className="bg-[#a09595] grid grid-cols-2  w-[60%] mx-auto rounded-xl p-2 my-3" id={props.id}>
    <div className=" w-full mb-2">
    <h4 className="text-xl relative">{props.cod_pedido}</h4>
       <h2>{props.nome}</h2>
       <h6>{props.forma_pagamento}</h6>
       <p>{props.cliente_endereco}</p>
       <span>{props.preco}</span>
    </div>
    <div className="space-y-10">
       {props.status ==="pendente"?(
        <span className="float-right text-2xl p-1 border-2 rounded-2xl border-yellow-400 text-white">{props.status}</span>
       ):(
        <span className="float-right text-2xl p-1 rounded-2xl border-2 border-green-500 text-white">{props.status}</span>
       )}
       <div className="clear-both"></div>
       {
        props.status === "pendente"?(
         <button className=" place-content-end float-right bottom-0 bg-[#64c02e] p-2 rounded-lg border-2 border-black" onClick={() =>confirma(props.id)}>Confirmar pedido</button>
        ):(
         <button className=" place-content-end float-right bottom-0 bg-[#e73a34] p-2 rounded-lg border-2 border-black" onClick={() =>cancela(props.id)}>Cancelar pedido</button>
        )
       }
    </div>
 </div>
)
}