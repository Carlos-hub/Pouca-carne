import { Logo } from "../components/assets-icons/Logo";
import { Input } from "../components/Input";
import { User, Lock } from "phosphor-react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Login(){
  const [token,setToken] = useState(null)
  const Navigate = useNavigate();
  const [email,setEmail] = useState('')
  const [senha,setSenha] = useState('')
  const [credentials,setCredentials] = useState(false)
  function direciona(){
    Navigate('/')
  }


  function onSubmit(e:any){
    e.preventDefault();
      const data = {
        email,
        senha
      }
      console.log(email,senha)
     try{
      axios.post(`http://localhost:3333/client/login`,data)
      .then((res) =>{
        // console.log(res)
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("id",res.data.decodes.payload.sub)
        toast.success('Logado com sucesso');
        direciona();
      })
      .catch((err) =>{
        if (err.response.data.message === 'Credentials invalid' || err.response.status == 400) {
          console.log(err.response.data);
          console.log(err.response.status);
          toast.error('Usuário ou senha incorreto');

        }
      })
      }catch(err){
      console.error(err)
     }
    }
  function signup(){
    Navigate('/signup');
  }

 return(
  <div className="bg-[#361F17] tablet:w-3/5 align-middle justify-items-center rounded-xl md:h-[30rem] sm:h-full self-center mx-auto md:top-4 sm:top-0 mt-10 mb-2">
    <div className="mx-5 max-w-[100%]">
      <Logo/>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
    </div>
    <form>
    <div className="justify-items-center self-center mx-5">
       <label className="mt-2">
         <p className="text-[#C9E265]">Login</p>
         <Input classname="block rounded-md p-1 w-full border-0" type="email" title="Login" placeholder="Login" onChange={(e:any)=>setEmail(e.target.value)} value={email} icon={<User size={32}/>}/>
       </label>
       <label className="mt-2">
         <p className="text-[#C9E265]">senha</p>
         <Input classname="block rounded-md p-1 w-full border-0" type="senha" title="senha" placeholder="senha" value={senha}  onChange={(e:any) =>setSenha(e.target.value)} icon={<Lock size={32} className="flex"/>}/>
      </label>
    </div>
    <div className="m-5">
       <div className="grid grid-cols-2 gap-2">
         <button className="bg-[#DAD5D5] p-2 rounded-lg hover:bg-[#fff]" onClick={signup}>Cadastre</button>
         <button className="bg-[#C9E265] p-2 rounded-lg hover:bg-[#bede40]" onClick={e => onSubmit(e)}>Acessar</button>
       </div>
       <div className="text-center mt-6 text-white hover:underline-offset-1">
         <a href="#" className=""> Esqueci minha senha</a>
       </div>
    </div>

    </form>
   
  </div>
 )
}