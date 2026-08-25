import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../components/Header";
import { Produto } from "../components/Produto";
import { CardapioSkeleton } from "../components/ui/Skeleton";
import { Vazio } from "../components/ui/Vazio";
import { api, formatarPreco } from "../lib/api";

interface IProduto {
  id: string;
  nome: string;
  descricao: string;
  ingredientes: string;
  imagem: string;
  valor: number;
  valordesconto: number;
}

export function Cardapio() {
  const [cardapio, setCardapio] = useState<IProduto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    let ativo = true;
    api
      .get<IProduto[]>("/client/produtos")
      .then((res) => {
        if (ativo) setCardapio(res.data);
      })
      .catch(() => toast.error("Não foi possível carregar o cardápio"))
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, []);

  const filtrados = cardapio.filter((produto) =>
    `${produto.nome} ${produto.descricao} ${produto.ingredientes}`.toLowerCase().includes(busca.toLowerCase())
  );
  const destaque = cardapio[0];

  return (
    <div className="min-h-screen">
      <Header />

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-12 tablet:pt-20">
        <div className="grid items-center gap-10 laptop:grid-cols-[1.1fr_1fr]">
          <div className="animate-rise">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mustard tablet:text-xs tablet:tracking-[0.28em]">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-pickle align-middle" />
              Cozinha aberta · entrega em ~30 min
            </p>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.045em] tablet:text-7xl">
              Menos conversa.
              <br />
              <span className="text-ember">Mais hambúrguer.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-ash">
              Pão assado no dia, blend moído na hora e entrega quente. Escolha, mande pra cozinha e acompanhe a comanda.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#cardapio"
                className="rounded-full bg-ember px-6 py-3 font-medium text-cream transition-colors duration-200 hover:bg-[#f16a41]"
              >
                Ver o cardápio
              </a>
              <a
                href="/pedidos"
                className="rounded-full border border-grill px-6 py-3 font-medium text-ash transition-colors duration-200 hover:border-cream hover:text-cream"
              >
                Acompanhar pedido
              </a>
            </div>
          </div>

          {destaque && (
            <div className="relative animate-rise" style={{ animationDelay: "120ms" }}>
              <div className="overflow-hidden rounded-[2rem] border border-grill">
                <img src={destaque.imagem} alt={destaque.nome} className="aspect-square w-full object-cover" />
              </div>
              <div className="absolute -bottom-4 left-4 rounded-2xl border border-grill bg-smoke px-4 py-3 shadow-[0_20px_50px_-30px_#000]">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">Mais pedido</p>
                <p className="font-display text-lg font-semibold leading-tight">{destaque.nome}</p>
                <p className="font-mono text-mustard">{formatarPreco(destaque.valordesconto || destaque.valor)}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="cardapio" className="mx-auto max-w-6xl px-4 pb-20 pt-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-grill pb-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Cardápio</h2>
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome ou ingrediente"
            aria-label="Buscar no cardápio"
            className="w-full max-w-xs rounded-full border border-grill bg-smoke px-4 py-2 text-sm placeholder:text-ash/60 focus:border-ember focus:outline-none tablet:w-72"
          />
        </div>

        {carregando ? (
          <CardapioSkeleton />
        ) : filtrados.length === 0 ? (
          <Vazio
            titulo={busca ? "Nada com esse nome" : "Cardápio vazio"}
            descricao={
              busca
                ? "Tente outro ingrediente ou limpe a busca."
                : "A cozinha ainda não cadastrou produtos."
            }
          />
        ) : (
          <div className="grid gap-5 tablet:grid-cols-2 laptop:grid-cols-3">
            {filtrados.map((produto, indice) => (
              <Produto
                key={produto.id}
                id={produto.id}
                imagem={produto.imagem}
                nome={produto.nome}
                descricao={produto.descricao}
                ingredientes={produto.ingredientes}
                valor={produto.valor}
                valordesconto={produto.valordesconto}
                indice={indice}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
