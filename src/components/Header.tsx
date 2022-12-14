
import { LogoMin } from "./assets-icons/LogoMin";
import { Hamburger, ShoppingCart, User, UserCircle } from "phosphor-react";

export function Header(){
  

   return(
    <div className="bg-[#361F17] grid grid-cols-2 justify-around h-32 max-h-32">
     <div className="max-w-full h-16 mx-15">
     <LogoMin />
     </div>
     <div className="my-auto mx-10">
      {!localStorage.getItem('token')?(
         <a href="/login" className="float-right my-auto bg-[#C9E265] flex px-4 py-2 text-xl rounded-2xl hover:bg-[#bede40]"> Login  <User size={24} weight="duotone" /></a>
      ):(
         <div>
         <a href="/dados" className="float-right my-auto bg-[#C9E265] flex p-1 text-xl rounded-2xl hover:bg-[#bede40]"> <UserCircle size={40} weight="bold" /></a>
         <a href="/pedidos" className="float-right my-auto p-2 mr-4 bg-[orange] rounded-full"><ShoppingCart size={32} weight="bold" /></a>
         <a href="/" className="float-right my-auto p-2 mr-4 bg-[orange] rounded-full"><Hamburger size={32} weight="bold" /></a>
         </div>
      )}
     </div>
    </div>
   )
}