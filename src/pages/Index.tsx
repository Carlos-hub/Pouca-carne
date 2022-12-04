import { Header } from "../components/Header";
import { Produto } from "../components/Produto";


export function Index(){
 return(
  <>
  <Header/>

  <h1>Hello World</h1>
  <div>
  <a href="/login">Login</a>
  </div>
  <div>
  <a href="/signup">Signup</a>


  </div>
  </>
 )
}