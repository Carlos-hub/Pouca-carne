
  import { Logo } from "../components/assets-icons/Logo";
  import { Input } from "../components/Input";
  import { User } from "phosphor-react"

export function Signup(){

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
            <Input classname="flex rounded-md p-1 w-full" type="text" title="name" placeholder="Nome" onChange={undefined} value={undefined}/>
            </label>
            <label className="mt-2">
            <p className="text-[#C9E265]">Nascimento</p>
            <Input classname="flex rounded-md p-1 w-full" type="date" title="date" placeholder="XX/XX/XXXX" onChange={undefined} value={undefined}/>
            </label>
         </div>
         <div className="grid grid-cols-2 gap-2">
             <label className="mt-2">
             <p className="text-[#C9E265]">CPF</p>
             <Input classname="flex rounded-md p-1 w-full" type="text" title="cpf" placeholder="XXX.XXX.XXX-XX" onChange={undefined} value={undefined}/>
             </label>
             <label className="mt-2">
             <p className="text-[#C9E265]">Telefone</p>
             <Input classname="flex rounded-md p-1 w-full" type="tel" title="phone" placeholder="(XX) X XXXX-XXXX" onChange={undefined} value={undefined}/>
             </label>
         </div>
         <label className="mt-2">
             <p className="text-[#C9E265]">E-mail</p>
             <Input classname="flex rounded-md p-1 w-full" type="email" title="email" placeholder="teste@gmail.com" onChange={undefined} value={undefined}/>
         </label>
         <div className="w-1/2">
         <label className="mt-2">
           <p className="text-[#C9E265]">Senha</p>
           <Input classname="flex rounded-md p-1 w-full" type="password" title="email" placeholder="**********" onChange={undefined} value={undefined}/>
         </label>
         </div>
         <div className="w-1/2">
         <label className="mt-2">
           <p className="text-[#C9E265]">Repita sua senha</p>
           <Input classname="flex rounded-md p-1 w-full" type="password" title="email" placeholder="**********" onChange={undefined} value={undefined}/>
         </label>
         </div>
         <div className="grid grid-cols-2 gap-2">
           <div className="w-1/2">
           <label className="mt-2">
             <p className="text-[#C9E265]">Recaptcha</p>
           </label>
           </div>
           <div className="w-1/2  justify-self-end">
           <label className="mt-2">
             <button className="bg-[#C9E265] text-black p-3 rounded-xl">Cadastrar</button>
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
