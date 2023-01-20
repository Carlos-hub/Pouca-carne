import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";


export function AddProduto(){

  const Navigate = useNavigate();
  const [nome,setNome] = useState('');
  const [descricao,setDescricao] = useState('');
  const [ingredientes,setIngredientes] = useState('');
  const [valor_unitario,setValor_unitario] = useState('');
  const [valor,setValor] = useState('');
  const [valordesconto,setValordesconto] = useState('')
 axios.post("http://localhost:3333/company/produto/signup", {
 
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.error(error);
});
 return (
  <div>
    <h1>Cadastrar produto</h1>
    <Input title={"Nome do Produto"} placeholder={"Nome do Produto"} classname={""} type={"text"} onChange={setNome} value={nome}/>
    <Input title={"Descricao"} placeholder={"Descrição do produto"} classname={""} type={"text"} onChange={setDescricao} value={descricao}/>
    <Input title={"ingredientes"} placeholder={"ingredientes"} classname={""} type={"text"} onChange={setIngredientes} value={ingredientes}/>
    <Input title={"valorunitario"} placeholder={"Valor unitario"} classname={""} type={""} onChange={setValor_unitario} value={valor_unitario}/>
    <Input title={"valor"} placeholder={"Preço"} classname={""} type={"text"} onChange={setValor} value={valor}/>
    <Input title={""} placeholder={""} classname={""} type={""} onChange={undefined} value={undefined}/>

  </div>
 )
}