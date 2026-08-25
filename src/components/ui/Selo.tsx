const estilos: Record<string, string> = {
  pendente: "border-mustard text-mustard",
  confirmado: "border-pickle text-pickle",
  cancelado: "border-ember text-ember",
};

export function Selo({ status }: { status: string }) {
  const chave = status.toLowerCase();
  const estilo = estilos[chave] ?? "border-ash text-ash";

  return (
    <span
      className={`inline-block animate-stamp rounded border-2 px-2.5 py-1 font-mono text-xs font-bold
        uppercase tracking-widest ${estilo}`}
      style={{ transform: "rotate(-8deg)" }}
    >
      {status}
    </span>
  );
}
