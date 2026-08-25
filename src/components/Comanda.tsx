import { ReactNode } from "react";
import { formatarPreco } from "../lib/api";
import { Selo } from "./ui/Selo";

export interface Pedido {
  id: string;
  nome: string;
  preco: number;
  cod_pedido: string;
  cliente_endereco: string;
  forma_pagamento: string;
  status: string;
  created_at: string;
}

interface ComandaProps {
  pedido: Pedido;
  acoes?: ReactNode;
  indice?: number;
}

function formatarData(iso: string) {
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return "—";
  return data.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export function Comanda({ pedido, acoes, indice = 0 }: ComandaProps) {
  return (
    <article
      className="animate-rise"
      style={{ animationDelay: `${Math.min(indice, 8) * 60}ms` }}
      aria-label={`Pedido ${pedido.cod_pedido}`}
    >
      <div className="ticket-edge" aria-hidden="true" />
      <div className="bg-[#EFE7DC] px-5 py-4 text-char shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]">
        <header className="flex items-start justify-between gap-4 border-b border-dashed border-char/25 pb-3">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-char/50">Comanda</p>
            <h3 className="truncate font-mono text-lg font-bold">{pedido.cod_pedido}</h3>
          </div>
          <Selo status={pedido.status} />
        </header>

        <dl className="space-y-1.5 py-3 font-mono text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-char/60">Item</dt>
            <dd className="truncate text-right">{pedido.nome}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-char/60">Entrega</dt>
            <dd className="truncate text-right">{pedido.cliente_endereco || "—"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-char/60">Pagamento</dt>
            <dd className="text-right uppercase">{pedido.forma_pagamento || "—"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-char/60">Feito às</dt>
            <dd className="text-right">{formatarData(pedido.created_at)}</dd>
          </div>
        </dl>

        <footer className="border-t border-dashed border-char/25 pt-3">
          <div className="flex items-baseline justify-between font-mono">
            <span className="text-[11px] uppercase tracking-[0.2em] text-char/50">Total</span>
            <span className="text-xl font-bold">{formatarPreco(pedido.preco)}</span>
          </div>
          {acoes && <div className="mt-4 flex flex-wrap justify-end gap-2">{acoes}</div>}
        </footer>
      </div>
      <div className="ticket-edge ticket-edge-bottom" aria-hidden="true" />
    </article>
  );
}
