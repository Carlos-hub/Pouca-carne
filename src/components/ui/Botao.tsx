import { ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primario" | "secundario" | "fantasma" | "perigo";

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  carregando?: boolean;
  children: ReactNode;
}

const variantes: Record<Variante, string> = {
  primario: "bg-ember text-cream hover:bg-[#f16a41] active:bg-[#cf4a24]",
  secundario: "bg-grill text-cream hover:bg-[#4a362d] border border-white/10",
  fantasma: "bg-transparent text-ash hover:text-cream hover:bg-white/5",
  perigo: "bg-transparent text-ember border border-ember/40 hover:bg-ember/10",
};

export function Botao({ variante = "primario", carregando = false, children, className = "", ...props }: BotaoProps) {
  return (
    <button
      {...props}
      disabled={props.disabled || carregando}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-medium
        transition-all duration-200 active:scale-[0.97]
        disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100
        ${variantes[variante]} ${className}`}
    >
      {carregando && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
