import axios from "axios";


export function AddProduto(){
 axios.post("https://serveless-pouca-carne-production.up.railway.app/company/produto/signup", {
  nome:"Maçã",
    descricao: "Fruta",
    ingredientes:"duas maçãs",
    valor_unitario:"1",
    imagem:"8987431",
    valor:2.50,
    valordesconto:1.75
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.error(error);
});
 return (
  <h1>oláaaaaaa</h1>
 )
}