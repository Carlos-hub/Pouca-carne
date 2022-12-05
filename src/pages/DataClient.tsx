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
 const d = {
  id : localStorage.getItem('id')
 } 
 const getDados = async () =>{
  try{
   const response = await axios.post(
    "https://serveless-pouca-carne-production.up.railway.app/client/data/",d
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
  <div>

   <div className="grid grid-cols-2 px-3 h-full">
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
     <div className="bg-[#582222] grid grid-row-auto space-y-4 mb-2">
      <span className="mx-auto flex text-xl">Meus endereços <NavigationArrow size={32} weight="bold" /></span>
      <textarea className="bg-transparent p-4 m-4 resize-none"/>
      <textarea className="bg-transparent p-4 m-4 resize-none"/>
     </div>
     </div>
   </div>
 )
}