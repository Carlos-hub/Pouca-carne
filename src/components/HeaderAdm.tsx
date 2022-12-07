
import { LogoMin } from "./assets-icons/LogoMin";
import { Hamburger } from "phosphor-react";

export function HeaderAdm(){
  

   return(
    <div className="bg-[#361F17] grid grid-cols-2 justify-around h-32 max-h-32">
     <div className="max-w-full h-16 mx-15">
     <LogoMin />
     </div>
     <div className="my-auto mx-10">
         <a href="/dados" className="float-right my-auto bg-[#C9E265] flex p-1 text-xl rounded-2xl hover:bg-[#bede40]"> <Hamburger size={32} weight="bold" /></a>
     </div>
    </div>
   )
}