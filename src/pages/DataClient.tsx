import axios from "axios";
import { NavigationArrow, User } from "phosphor-react";
import { useEffect, useState } from "react";

interface IClient{
  length: number;
  id?:string;
  nome?:string;
  email?:string;
  cpf?:string;
  datanascimento?:string;
  telefone?:string;
}

export function DataClient(){
 const [dados,setDados] = useState<IClient>({
   length: 0
 })
 const header:any = {
  token:localStorage.getItem('token'),
  id : localStorage.getItem('id')
 }
 const getDados = async () =>{
  try{
   const response = await axios.get(
    "https://serveless-pouca-carne-production.up.railway.app/client/data/",{
      headers:{
        token:localStorage.getItem('token'),
        id : localStorage.getItem('id')
      }
    }
   );
   const data:any = response.data;
   console.log(data)
   setDados(data)
  }catch(error){
   console.log(error);
  }
 }
 useEffect(() =>{
  getDados();
 },[]);
 return(
  <div className="h-full">

   <div className="grid grid-cols-2 px-3 h-[50vw] pb-3">
  {dados.length === 0 ? (
   <p className="text-center">Carregando...</p>
   ) : (
      <div key={dados.id} className="grid grid-row-auto space-y-4">
       <span className="mx-auto flex text-xl">Meus dados <User size={40}/></span>
       <input className="p-2 rounded-2xl border-2 border-gray-700 hover:border-gray-300 ease-linear duration-300" type="text" defaultValue={dados.nome}></input>
       <input className="p-2 rounded-2xl border-2 border-gray-700 hover:border-gray-300 ease-linear duration-300" type="text" defaultValue={dados.email}></input>
       <input className="p-2 rounded-2xl border-2 border-gray-700 hover:border-gray-300 ease-linear duration-300" type="date" defaultValue={dados.datanascimento}></input>
       <input className="p-2 rounded-2xl border-2 border-gray-700 hover:border-gray-300 ease-linear duration-300" type="text" defaultValue={dados.cpf}></input>
       <input className="p-2 rounded-2xl border-2 border-gray-700 hover:border-gray-300 ease-linear duration-300" type="text" defaultValue={dados.telefone}></input>
       <div className="flex">
        <div><button className="bg-[#C9E265] p-2 rounded-2xl">Atualizar dados</button></div>
       </div>
       
      </div>
     )}
     <div className="bg-[#582222] grid grid-row-auto space-y-4 pb-5 h-full rounded-md">
      <span className="mx-auto flex text-xl py-auto">Meus endereços <NavigationArrow size={30} weight="bold" /></span>
      <textarea placeholder="Digite seu endereço" className="bg-transparent p-4 mx-4 resize-none border-2 border-white mb-3 rounded-xl"/>
      <textarea placeholder="Digite seu endereço" className="bg-transparent p-4 mx-4 resize-none border-2 border-white mb-3 rounded-xl"/>
     </div>
     </div>
   </div>
 )
}