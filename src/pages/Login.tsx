import { Logo } from "../components/assets-icons/Logo";
import { Input } from "../components/Input";
import { User, Lock } from "phosphor-react"
export function Login(){

 return(
  <div className="bg-[#361F17] tablet:w-3/5 align-middle justify-items-center rounded-xl md:h-[30rem] sm:h-full self-center mx-auto md:top-4 sm:top-0 mt-10">
    <div className="mx-5 max-w-[100%]">
      <Logo/>
    </div>
    <div className="justify-items-center self-center mx-5">
       <label className="mt-2">
         <p className="text-[#C9E265]">Login</p>
         <Input classname="block rounded-md p-1 w-full border-0" type="email" title="Login" placeholder="Login" icon={<User size={32}/>}/>
       </label>
       <label className="mt-2">
         <p className="text-[#C9E265]">Password</p>
         <Input classname="block rounded-md p-1 w-full border-0" type="password" title="Password" placeholder="Password" icon={<Lock size={32} className="flex"/>}/>
      </label>
    </div>
    <div className="m-5">
       <div className="grid grid-cols-2 gap-2">
         <button className="bg-[#DAD5D5] p-2 rounded-lg hover:bg-[#fff]">Cadastre-se</button>
         <button className="bg-[#C9E265] p-2 rounded-lg hover:bg-[#bede40]">Acessar</button>
       </div>
       <div className="text-center mt-6 text-white hover:underline-offset-1">
         <a href="#" className=""> Esqueci minha senha</a>
       </div>
    </div>
  </div>
 )
}