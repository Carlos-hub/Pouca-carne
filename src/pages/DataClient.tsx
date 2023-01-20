import axios from "axios";
import { NavigationArrow, User } from "phosphor-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../components/Input";

interface IClient{
  cep: string | number | readonly string[] | undefined;
  endereco: string | number | readonly string[] | undefined;
  length: number;
  id?:string;
  nome?:string;
  email?:string;
  cpf?:string;
  datanascimento?:string;
  telefone?:string;
}

export function DataClient(){
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [senhaConfirma,setSenhaConfirma] = useState('');
  const [nome,setNome] = useState('');
  const [cep,setCep] = useState('');
  const [endereco,setEndereco] = useState('');
  const [telefone,setTelefone] = useState('')



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
    "http://localhost:3333/client/data/",{
      headers:{
        token:localStorage.getItem('token'),
        id : localStorage.getItem('id')
      }
    }
   )
   .then(res =>{
      if(res.status == 201){
        toast.success("Endereço criado com sucesso")
      }
   })
   .catch(err =>{
    if(err.response.data.message === 'Credentials invalid' || err.response.status == 400){
      toast.error("Erro Consulte o administrador")
    }
   })
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

  function addEndereco(){
    const body = {
      id_client: localStorage.getItem('id'),
      nome_rua: endereco,
      cep: cep
    }
    try{
      axios.post('http://localhost:3333/client/endereco',{
      body,
      headers:{
        token:localStorage.getItem('token')
      }
    })
    }catch(err){
        console.log(err);
    }
  }

 return(
  <div className="h-full">

      <div className="grid grid-cols-2 px-3 h-[50vw] pb-3 h-full" >
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
        <div className="bg-[#582222] block space-y-4 pb-5 h-full rounded-md">
              <span className="mx-auto flex text-xl py-auto">Meus endereços <NavigationArrow size={30} weight="bold" /></span>
              <input placeholder="CEP" className="bg-transparent p-2 rounded-2xl border-2 hover:border-gray-300 ease-linear duration-300 w-10/12" defaultValue={dados.cep} value={cep} onChange={(e:any)=>setCep(e.target.value)}/>
              <input placeholder="Digite seu endereço" className="bg-transparent p-2 rounded-2xl border-2 hover:border-gray-300 ease-linear duration-300 w-10/12" defaultValue={dados.endereco} value={endereco} onChange={(e:any)=>setEndereco(e.target.value)}/>
              <button className="bg-[#C9E265] p-2 rounded-full" onClick={addEndereco()}>Atualizar endereço</button>
        </div>
      </div>
   </div>
 )
}