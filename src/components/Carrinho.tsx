import { Minus, Plus, Trash, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { api, formatarPreco, mensagemDeErro } from "../lib/api";
import { Botao } from "./ui/Botao";

const formasDePagamento = ["Pix", "Cartão", "Dinheiro"];

export function Carrinho() {
  const { itens, aberto, fechar, alterarQuantidade, remover, limpar, valorTotal, quantidadeTotal } = useCart();
  const { autenticado } = useAuth();
  const navegar = useNavigate();
  const [pagamento, setPagamento] = useState(formasDePagamento[0]);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "Escape") fechar();
    }
    if (aberto) window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto, fechar]);

  async function finalizar() {
    if (!autenticado) {
      fechar();
      navegar("/login");
      return;
    }

    setEnviando(true);
    try {
      // o back-end registra um pedido por unidade
      for (const item of itens) {
        for (let i = 0; i < item.quantidade; i++) {
          await api.post("/client/delivery", {
            id_produto: item.id,
            preco: item.valor,
            cliente_numero: "",
            forma_pagamento: pagamento,
          });
        }
      }
      limpar();
      fechar();
      toast.success("Pedido enviado para a cozinha");
      navegar("/pedidos");
    } catch (err: any) {
      const mensagem = mensagemDeErro(err, "Não foi possível enviar o pedido");
      if (mensagem === "endereco não existe") {
        toast.error("Cadastre um endereço antes de pedir");
        fechar();
        navegar("/dados");
      } else {
        toast.error(mensagem);
      }
    } finally {
      setEnviando(false);
    }
  }

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Sacola">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={fechar} />

      <aside className="relative flex h-full w-full max-w-sm animate-slide-in flex-col border-l border-grill bg-smoke">
        <header className="flex items-center justify-between border-b border-grill px-5 py-4">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight">Sua sacola</h2>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ash">
              {quantidadeTotal} {quantidadeTotal === 1 ? "item" : "itens"}
            </p>
          </div>
          <button onClick={fechar} className="rounded-full p-2 text-ash hover:bg-white/5 hover:text-cream" aria-label="Fechar sacola">
            <X size={20} weight="bold" />
          </button>
        </header>

        {itens.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-lg">Sacola vazia</p>
            <p className="text-sm text-ash">Escolha um hambúrguer no cardápio para começar.</p>
            <Botao variante="secundario" onClick={fechar}>Ver cardápio</Botao>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {itens.map((item) => (
                <li key={item.id} className="flex gap-3 rounded-xl border border-grill bg-char/50 p-3">
                  <img src={item.imagem} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{item.nome}</p>
                    <p className="font-mono text-sm text-mustard">{formatarPreco(item.valor)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => alterarQuantidade(item.id, -1)}
                        className="rounded-full border border-grill p-1 text-ash hover:text-cream"
                        aria-label={`Remover uma unidade de ${item.nome}`}
                      >
                        <Minus size={14} weight="bold" />
                      </button>
                      <span className="w-6 text-center font-mono text-sm">{item.quantidade}</span>
                      <button
                        onClick={() => alterarQuantidade(item.id, 1)}
                        className="rounded-full border border-grill p-1 text-ash hover:text-cream"
                        aria-label={`Adicionar uma unidade de ${item.nome}`}
                      >
                        <Plus size={14} weight="bold" />
                      </button>
                      <button
                        onClick={() => remover(item.id)}
                        className="ml-auto rounded-full p-1 text-ash hover:text-ember"
                        aria-label={`Tirar ${item.nome} da sacola`}
                      >
                        <Trash size={16} weight="bold" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="space-y-4 border-t border-grill px-5 py-4">
              <fieldset>
                <legend className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-ash">Pagamento</legend>
                <div className="flex gap-2">
                  {formasDePagamento.map((forma) => (
                    <button
                      key={forma}
                      onClick={() => setPagamento(forma)}
                      aria-pressed={pagamento === forma}
                      className={`flex-1 rounded-full border px-3 py-2 text-sm transition-colors duration-200 ${
                        pagamento === forma
                          ? "border-ember bg-ember/15 text-cream"
                          : "border-grill text-ash hover:text-cream"
                      }`}
                    >
                      {forma}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-ash">Total</span>
                <span className="font-display text-2xl font-semibold">{formatarPreco(valorTotal)}</span>
              </div>

              <Botao onClick={finalizar} carregando={enviando} className="w-full">
                {autenticado ? "Enviar para a cozinha" : "Entrar para pedir"}
              </Botao>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
