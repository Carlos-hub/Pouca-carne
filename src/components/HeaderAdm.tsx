import { SignOut } from "phosphor-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Wordmark } from "./ui/Wordmark";

const links = [
  { para: "/shop/adm", rotulo: "Comandas" },
  { para: "/adm/product", rotulo: "Novo produto" },
];

export function HeaderAdm() {
  const { sair } = useAuth();
  const navegar = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-grill/70 bg-char/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Wordmark para="/shop/adm" />
          <span className="rounded-full border border-grill px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mustard">
            Cozinha
          </span>
        </div>

        <nav className="flex items-center gap-1" aria-label="Painel">
          {links.map((link) => (
            <NavLink
              key={link.para}
              to={link.para}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm transition-colors duration-200 ${
                  isActive ? "bg-white/10 text-cream" : "text-ash hover:text-cream"
                }`
              }
            >
              {link.rotulo}
            </NavLink>
          ))}
          <button
            onClick={() => {
              sair();
              navegar("/adm/login");
            }}
            className="ml-1 rounded-full border border-grill p-2.5 text-ash transition-colors duration-200 hover:border-ember hover:text-ember"
            aria-label="Sair do painel"
          >
            <SignOut size={20} weight="bold" />
          </button>
        </nav>
      </div>
    </header>
  );
}
