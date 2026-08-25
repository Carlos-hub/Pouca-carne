import { Plus } from "phosphor-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { formatarPreco } from "../lib/api";

interface ProdutoProps {
  id: string;
  imagem: string;
  nome: string;
  descricao: string;
  ingredientes?: string;
  valor: number;
  valordesconto?: number;
  indice?: number;
}

export function Produto(props: ProdutoProps) {
  const { adicionar } = useCart();
  const [adicionado, setAdicionado] = useState(false);
  const temDesconto = Boolean(props.valordesconto && props.valordesconto < props.valor);
  const precoFinal = temDesconto ? (props.valordesconto as number) : props.valor;

  function aoAdicionar() {
    adicionar({ id: props.id, nome: props.nome, imagem: props.imagem, valor: precoFinal });
    setAdicionado(true);
    toast.success(`${props.nome} na sacola`);
    setTimeout(() => setAdicionado(false), 1200);
  }

  return (
    <article
      className="group flex animate-rise flex-col overflow-hidden rounded-2xl border border-grill bg-smoke
        transition-all duration-300 hover:-translate-y-1 hover:border-ember/50"
      style={{ animationDelay: `${Math.min(props.indice ?? 0, 8) * 70}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-char">
        <img
          src={props.imagem}
          alt={props.nome}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {temDesconto && (
          <span className="absolute left-3 top-3 rounded-full bg-mustard px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-char">
            Oferta
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">{props.nome}</h3>
        <p className="line-clamp-2 text-sm text-ash">{props.descricao}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div>
            {temDesconto && (
              <p className="font-mono text-xs text-ash line-through">{formatarPreco(props.valor)}</p>
            )}
            <p className="font-mono text-xl font-bold text-mustard">{formatarPreco(precoFinal)}</p>
          </div>
          <button
            onClick={aoAdicionar}
            aria-label={`Adicionar ${props.nome} à sacola`}
            className={`rounded-full p-3 transition-all duration-200 active:scale-90 ${
              adicionado ? "bg-pickle text-cream" : "bg-ember text-cream hover:bg-[#f16a41]"
            }`}
          >
            <Plus size={20} weight="bold" className={adicionado ? "rotate-45 transition-transform" : "transition-transform"} />
          </button>
        </div>
      </div>
    </article>
  );
}
