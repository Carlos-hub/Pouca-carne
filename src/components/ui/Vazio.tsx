import { ReactNode } from "react";

interface VazioProps {
  titulo: string;
  descricao: string;
  acao?: ReactNode;
}

export function Vazio({ titulo, descricao, acao }: VazioProps) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-dashed border-grill px-6 py-14 text-center animate-rise">
      <h3 className="font-display text-2xl font-semibold tracking-tight">{titulo}</h3>
      <p className="mx-auto mt-2 max-w-xs text-ash">{descricao}</p>
      {acao && <div className="mt-6 flex justify-center">{acao}</div>}
    </div>
  );
}
