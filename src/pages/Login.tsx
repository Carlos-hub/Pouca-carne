import { Logo } from "../components/assets-icons/Logo";
import { Input } from "../components/Input";

export function Login(){

 return(
  <div className=" bg-[#361F17] w-2/5 align-middle justify-items-center rounded-xl h-[25rem] self-center m-auto top-4">
    <div>
      <Logo/>
    </div>
    <div className="justify-items-center self-center mx-5">
     <Input classname="block rounded-md mt-2 p-1 w-full" title="Login" placeholder="Login!"/>
     <Input classname="block rounded-md mt-2 p-1 w-full" title="Password" placeholder="Password"/>
    </div>
  </div>
 )
}