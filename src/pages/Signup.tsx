
  import { Logo } from "../components/assets-icons/Logo";
  import { Input } from "../components/Input";
  import { User } from "phosphor-react"

export function Signup(){

 return(
    <div className=" bg-[#361F17] w-2/5 align-middle justify-items-center rounded-xl h-[25rem] self-center mx-auto top-4 mt-10">
      <div className="mx-5">
        <Logo/>
      </div>
      <div className="justify-items-center self-center mx-5">
       <label className="mt-2">
       <p className="text-[#C9E265]">Login</p>
       <Input classname="block rounded-md p-1 w-full" type="email" title="Login" placeholder="Login"/>
       </label>
       <label className="mt-2">
       <p className="text-[#C9E265]">Password</p>
       <Input classname="block rounded-md p-1 w-full" type="password" title="Password" placeholder="Password"/>
       </label>
      </div>
    </div>
   )
 }
