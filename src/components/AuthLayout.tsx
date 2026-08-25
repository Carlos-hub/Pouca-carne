import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Wordmark } from "./ui/Wordmark";

interface AuthLayoutProps {
  titulo: string;
  subtitulo: string;
  frase: string;
  children: ReactNode;
  rodape?: ReactNode;
}

export function AuthLayout({ titulo, subtitulo, frase, children, rodape }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen laptop:grid-cols-[1fr_1.1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-grill bg-smoke p-10 laptop:flex">
        <Wordmark tamanho="lg" />
        <div className="relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mustard">Desde o balcão</p>
          <p className="mt-4 max-w-sm font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.04em]">
            {frase}
          </p>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ash">Pouca Carne · Delivery</p>
        <div
          className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-ember/20 blur-3xl"
          aria-hidden="true"
        />
      </aside>

      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm animate-rise">
          <div className="laptop:hidden">
            <Wordmark tamanho="lg" />
          </div>
          <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight laptop:mt-0">{titulo}</h1>
          <p className="mt-2 text-ash">{subtitulo}</p>
          <div className="mt-8">{children}</div>
          {rodape && <div className="mt-6 text-sm text-ash">{rodape}</div>}
          <Link to="/" className="mt-8 inline-block text-sm text-ash underline-offset-4 hover:text-cream hover:underline">
            Voltar ao cardápio
          </Link>
        </div>
      </main>
    </div>
  );
}
