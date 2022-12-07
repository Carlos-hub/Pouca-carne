
  import { Logo } from "../components/assets-icons/Logo";
  import { Input } from "../components/Input";
  import { User } from "phosphor-react";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup(){
  const Navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [senhaConfirma,setSenhaConfirma] = useState('');
  const [nome,setNome] = useState('');
  const [cpf,setCpf] = useState('');
  const [datanascimento,setDatanascimento] = useState('');
  const [telefone,setTelefone] = useState('')




  function onSubmit(e:any){
    e.preventDefault();
      const data = {
        nome,
        cpf,
        datanascimento,
        telefone,
        email,
        senha
      }
      console.log("email "+email, "senha " +senha,"nome "+nome,"cpf "+cpf,"telefone "+telefone,"datanascimento "+datanascimento)
        try{
         axios.post(`https://serveless-pouca-carne-production.up.railway.app/client/signup`,data)
         .then((res) =>{
           console.log(res)
           Navigate('/');
         })
         .catch((err) =>{
         })
         }catch(err){
         console.error(err)
        }
    }


 return(
    <div className=" bg-[#361F17] w-3/5 align-middle justify-items-center rounded-xl h-fit self-center mx-auto top-4 mt-10 p-3">
      <div className="mx-auto h-36 mb-4">
        <Logo/>
      </div>
      <div>
        <div className="justify-items-center self-center mx-5">
         <div className="grid grid-cols-2 gap-2">
            <label className="mt-2">
            <p className="text-[#C9E265]">Nome</p>
            <Input classname="flex rounded-md p-1 w-full" type="text" title="name" placeholder="Nome" onChange={(e:any)=>setNome(e.target.value)} value={nome}/>
            </label>
            <label className="mt-2">
            <p className="text-[#C9E265]">Nascimento</p>
            <Input classname="flex rounded-md p-1 w-full" type="date" title="date" placeholder="XX/XX/XXXX" onChange={(e:any)=>setDatanascimento(e.target.value)} value={datanascimento}/>
            </label>
         </div>
         <div className="grid grid-cols-2 gap-2">
             <label className="mt-2">
             <p className="text-[#C9E265]">CPF</p>
             <Input classname="flex rounded-md p-1 w-full" type="text" title="cpf" placeholder="XXX.XXX.XXX-XX" onChange={(e:any)=>setCpf(e.target.value)} value={cpf}/>
             </label>
             <label className="mt-2">
             <p className="text-[#C9E265]">Telefone</p>
             <Input classname="flex rounded-md p-1 w-full" type="tel" title="phone" placeholder="(XX) X XXXX-XXXX" onChange={(e:any)=>setTelefone(e.target.value)} value={telefone}/>
             </label>
         </div>
         <label className="mt-2">
             <p className="text-[#C9E265]">E-mail</p>
             <Input classname="flex rounded-md p-1 w-full" onChange={(e:any)=>setEmail(e.target.value)} value={email} type="email" title="email" placeholder="teste@gmail.com"/>
         </label>
         <div className="w-1/2">
         <label className="mt-2">
           <p className="text-[#C9E265]">Senha</p>
           <Input classname="flex rounded-md p-1 w-full" type="password" title="email" placeholder="**********" onChange={(e:any) =>setSenha(e.target.value)} value={senha}/>
         </label>
         </div>
         <div className="w-1/2">
         <label className="mt-2">
           <p className="text-[#C9E265]">Repita sua senha</p>
           <Input classname="flex rounded-md p-1 w-full" type="password" title="email" placeholder="**********" onChange={(e:any) =>setSenhaConfirma(e.target.value)} value={senhaConfirma}/>
         </label>
         </div>
         <div className="grid grid-cols-2 gap-2">
           <div className="w-1/2">
           <label className="mt-2">
           </label>
           </div>
           <div className="w-1/2  justify-self-end">
           <label className="mt-2">
             {senha!=senhaConfirma ||senha==""?
             (
              <button disabled className="bg-[#C9E265] text-black p-3 rounded-xl opacity-50" onClick={e =>onSubmit(e)}>Cadastrar</button>
              ):(
                <button className="bg-[#C9E265] text-black p-3 rounded-xl" onClick={e =>onSubmit(e)}>Cadastrar</button>
              )
             }
            
           </label>
           </div>
         </div>
         <div>
          
         </div>
        </div>
      </div>
    </div>
   )
 }
