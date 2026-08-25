import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Comanda, Pedido } from "../components/Comanda";
import { Header } from "../components/Header";
import { Botao } from "../components/ui/Botao";
import { Skeleton } from "../components/ui/Skeleton";
import { Vazio } from "../components/ui/Vazio";
import { api, mensagemDeErro } from "../lib/api";

export function PedidosClient() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [cancelando, setCancelando] = useState<string | null>(null);

  const buscar = useCallback(async () => {
    try {
      const res = await api.get<Pedido[]>("/client/pedidos");
      setPedidos(res.data ?? []);
    } catch (err: any) {
      toast.error(mensagemDeErro(err, "Não foi possível carregar seus pedidos"));
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    buscar();
    // a cozinha muda o status do outro lado; recarrega a cada 15s
    const intervalo = setInterval(buscar, 15000);
    return () => clearInterval(intervalo);
  }, [buscar]);

  async function cancelar(id: string) {
    setCancelando(id);
    // atualização otimista: o selo muda antes da resposta chegar
    setPedidos((atuais) => atuais.map((p) => (p.id === id ? { ...p, status: "Cancelado" } : p)));
    try {
      await api.post("/client/cancela", { id });
      toast.success("Pedido cancelado");
    } catch (err: any) {
      toast.error(mensagemDeErro(err, "Não foi possível cancelar"));
    } finally {
      setCancelando(null);
      buscar();
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 border-b border-grill pb-4">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mustard">Acompanhamento</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.04em]">Meus pedidos</h1>
          <p className="mt-2 text-ash">O status atualiza sozinho enquanto a cozinha trabalha.</p>
        </div>

        {carregando ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-56" />
            ))}
          </div>
        ) : pedidos.length === 0 ? (
          <Vazio
            titulo="Nenhum pedido ainda"
            descricao="Quando você mandar um pedido para a cozinha, a comanda aparece aqui."
            acao={
              <Link to="/">
                <Botao>Ver cardápio</Botao>
              </Link>
            }
          />
        ) : (
          <div className="space-y-6">
            {pedidos.map((pedido, indice) => (
              <Comanda
                key={pedido.id}
                pedido={pedido}
                indice={indice}
                acoes={
                  pedido.status.toLowerCase() === "pendente" ? (
                    <button
                      onClick={() => cancelar(pedido.id)}
                      disabled={cancelando === pedido.id}
                      className="rounded-full border border-char/30 px-4 py-2 font-mono text-xs uppercase tracking-widest text-char/70
                        transition-colors duration-200 hover:border-ember hover:text-ember disabled:opacity-50"
                    >
                      Cancelar pedido
                    </button>
                  ) : null
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
