import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Comanda, Pedido } from "../components/Comanda";
import { HeaderAdm } from "../components/HeaderAdm";
import { Skeleton } from "../components/ui/Skeleton";
import { Vazio } from "../components/ui/Vazio";
import { api, formatarPreco, mensagemDeErro } from "../lib/api";

const filtros = ["Todos", "Pendente", "Confirmado", "Cancelado"] as const;
type Filtro = (typeof filtros)[number];

export function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState<Filtro>("Todos");
  const [processando, setProcessando] = useState<string | null>(null);

  const buscar = useCallback(async () => {
    try {
      const res = await api.get<Pedido[]>("/company/pedidos/");
      setPedidos(res.data ?? []);
    } catch (err: any) {
      toast.error(mensagemDeErro(err, "Não foi possível carregar as comandas"));
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    buscar();
    // novas comandas chegam a qualquer momento
    const intervalo = setInterval(buscar, 10000);
    return () => clearInterval(intervalo);
  }, [buscar]);

  async function mudarStatus(id: string, rota: string, novoStatus: string, sucesso: string) {
    setProcessando(id);
    setPedidos((atuais) => atuais.map((p) => (p.id === id ? { ...p, status: novoStatus } : p)));
    try {
      await api.post(rota, { id });
      toast.success(sucesso);
    } catch (err: any) {
      toast.error(mensagemDeErro(err, "Não foi possível atualizar a comanda"));
    } finally {
      setProcessando(null);
      buscar();
    }
  }

  const visiveis = useMemo(
    () => (filtro === "Todos" ? pedidos : pedidos.filter((p) => p.status.toLowerCase() === filtro.toLowerCase())),
    [pedidos, filtro]
  );

  const pendentes = pedidos.filter((p) => p.status.toLowerCase() === "pendente");
  const faturamento = pedidos
    .filter((p) => p.status.toLowerCase() === "confirmado")
    .reduce((soma, p) => soma + Number(p.preco), 0);

  return (
    <div className="min-h-screen">
      <HeaderAdm />

      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8 border-b border-grill pb-6">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mustard">Fila da cozinha</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.04em]">Comandas</h1>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-grill bg-smoke px-4 py-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">Na fila</dt>
              <dd className="font-display text-2xl font-semibold text-mustard">{pendentes.length}</dd>
            </div>
            <div className="rounded-xl border border-grill bg-smoke px-4 py-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">Total</dt>
              <dd className="font-display text-2xl font-semibold">{pedidos.length}</dd>
            </div>
            <div className="rounded-xl border border-grill bg-smoke px-4 py-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">Confirmado</dt>
              <dd className="font-display text-2xl font-semibold text-pickle">{formatarPreco(faturamento)}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            {filtros.map((opcao) => (
              <button
                key={opcao}
                onClick={() => setFiltro(opcao)}
                aria-pressed={filtro === opcao}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                  filtro === opcao ? "border-ember bg-ember/15 text-cream" : "border-grill text-ash hover:text-cream"
                }`}
              >
                {opcao}
              </button>
            ))}
          </div>
        </div>

        {carregando ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-56" />
            ))}
          </div>
        ) : visiveis.length === 0 ? (
          <Vazio
            titulo={filtro === "Todos" ? "Nenhuma comanda" : `Nada em ${filtro.toLowerCase()}`}
            descricao="Assim que um cliente pedir, a comanda aparece nesta fila."
          />
        ) : (
          <div className="space-y-6">
            {visiveis.map((pedido, indice) => (
              <Comanda
                key={pedido.id}
                pedido={pedido}
                indice={indice}
                acoes={
                  pedido.status.toLowerCase() === "pendente" ? (
                    <>
                      <button
                        onClick={() => mudarStatus(pedido.id, "/company/pedidos/cancela", "Cancelado", "Comanda cancelada")}
                        disabled={processando === pedido.id}
                        className="rounded-full border border-char/30 px-4 py-2 font-mono text-xs uppercase tracking-widest text-char/70
                          transition-colors duration-200 hover:border-ember hover:text-ember disabled:opacity-50"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => mudarStatus(pedido.id, "/company/pedidos/aprove", "Confirmado", "Comanda confirmada")}
                        disabled={processando === pedido.id}
                        className="rounded-full bg-char px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream
                          transition-colors duration-200 hover:bg-pickle disabled:opacity-50"
                      >
                        Confirmar pedido
                      </button>
                    </>
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
