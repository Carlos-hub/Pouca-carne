import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HeaderAdm } from "../components/HeaderAdm";
import { Input } from "../components/Input";
import { Botao } from "../components/ui/Botao";
import { api, formatarPreco, mensagemDeErro } from "../lib/api";

export function AddProduto() {
  const navegar = useNavigate();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [valor_unitario, setValorUnitario] = useState("1");
  const [imagem, setImagem] = useState("");
  const [valor, setValor] = useState("");
  const [valordesconto, setValordesconto] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    try {
      await api.post("/company/produto/signup", {
        nome,
        descricao,
        ingredientes,
        valor_unitario,
        imagem,
        valor: Number(valor),
        valordesconto: Number(valordesconto) || 0,
      });
      toast.success("Produto no cardápio");
      navegar("/shop/adm");
    } catch (err: any) {
      toast.error(mensagemDeErro(err, "Não foi possível cadastrar o produto"));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="min-h-screen">
      <HeaderAdm />

      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8 border-b border-grill pb-4">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mustard">Cardápio</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.04em]">Novo produto</h1>
        </div>

        <div className="grid gap-8 laptop:grid-cols-[1.2fr_1fr]">
          <form onSubmit={onSubmit} className="space-y-4">
            <Input rotulo="Nome" placeholder="Pouca Carne Clássico" value={nome} onChange={setNome} required />
            <Input rotulo="Descrição" placeholder="O que o cliente vê no card" value={descricao} onChange={setDescricao} required />
            <Input rotulo="Ingredientes" placeholder="Pão brioche, blend 180g, queijo" value={ingredientes} onChange={setIngredientes} required />
            <Input rotulo="Imagem (URL)" type="url" placeholder="https://…" value={imagem} onChange={setImagem} required />
            <div className="grid gap-4 tablet:grid-cols-3">
              <Input rotulo="Preço" inputMode="decimal" placeholder="28.90" value={valor} onChange={setValor} required />
              <Input rotulo="Preço com desconto" inputMode="decimal" placeholder="24.90" value={valordesconto} onChange={setValordesconto} />
              <Input rotulo="Unidades" inputMode="numeric" placeholder="1" value={valor_unitario} onChange={setValorUnitario} required />
            </div>
            <Botao type="submit" carregando={enviando}>Cadastrar produto</Botao>
          </form>

          <aside>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ash">Prévia no cardápio</p>
            <div className="overflow-hidden rounded-2xl border border-grill bg-smoke">
              <div className="aspect-[4/3] bg-char">
                {imagem ? (
                  <img src={imagem} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-ash">Cole uma URL de imagem</div>
                )}
              </div>
              <div className="space-y-2 p-4">
                <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">
                  {nome || "Nome do produto"}
                </h3>
                <p className="line-clamp-2 text-sm text-ash">{descricao || "Descrição aparece aqui."}</p>
                <p className="font-mono text-xl font-bold text-mustard">
                  {valor ? formatarPreco(Number(valordesconto) || Number(valor)) : "R$ 0,00"}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
