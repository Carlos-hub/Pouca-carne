import axios from "axios"
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { Header } from "../components/Header";
import { Produto } from "../components/Produto";

export function Cardapio(){
 const [cardapio,setCardapio] = useState<any[]>([])

 const getProdutos = async () =>{
  try{
   const response = await axios.get(
    "http://localhost:3333/client/produtos"
   );
   const data = response.data;
   setCardapio(data)
  }catch(error){
   console.log(error);
  }
 }
 useEffect(() =>{
  getProdutos();
 },[]);
 return<>
  <Header/>
  <h1 className="px-auto">Cardapio</h1>
  <div className="grid grid-cols-3 gap-3 p-4">
    {cardapio.length === 0 ? (
    // <p className="text-center">Carregando...</p>
    <Loading type="balls"/>
    ) : (
     cardapio.map((cardapio) =>(
     
      <Produto id={cardapio.id} imagem={cardapio.imagem} title={cardapio.nome} description={cardapio.descricao} preco={cardapio.valor} key={cardapio.id}/>

     ))
    )}
   </div>
  </>
}