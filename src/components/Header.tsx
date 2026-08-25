import { Bag, SignOut, User } from "phosphor-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Wordmark } from "./ui/Wordmark";

const links = [
  { para: "/", rotulo: "Cardápio" },
  { para: "/pedidos", rotulo: "Meus pedidos", privado: true },
  { para: "/dados", rotulo: "Meus dados", privado: true },
];

export function Header() {
  const { autenticado, sair } = useAuth();
  const { quantidadeTotal, abrir } = useCart();
  const navegar = useNavigate();

  function sairEVoltar() {
    sair();
    navegar("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-grill/70 bg-char/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Wordmark />

        <nav className="hidden items-center gap-1 tablet:flex" aria-label="Principal">
          {links
            .filter((link) => !link.privado || autenticado)
            .map((link) => (
              <NavLink
                key={link.para}
                to={link.para}
                end
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm transition-colors duration-200 ${
                    isActive ? "bg-white/10 text-cream" : "text-ash hover:text-cream"
                  }`
                }
              >
                {link.rotulo}
              </NavLink>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={abrir}
            className="relative rounded-full border border-grill p-2.5 text-cream transition-colors duration-200 hover:border-ember hover:text-ember"
            aria-label={`Abrir sacola com ${quantidadeTotal} ${quantidadeTotal === 1 ? "item" : "itens"}`}
          >
            <Bag size={20} weight="bold" />
            {quantidadeTotal > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-ember px-1 font-mono text-[11px] font-bold text-cream">
                {quantidadeTotal}
              </span>
            )}
          </button>

          {autenticado ? (
            <button
              onClick={sairEVoltar}
              className="rounded-full border border-grill p-2.5 text-ash transition-colors duration-200 hover:border-ember hover:text-ember"
              aria-label="Sair da conta"
            >
              <SignOut size={20} weight="bold" />
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-ember px-4 py-2 text-sm font-medium text-cream transition-colors duration-200 hover:bg-[#f16a41]"
            >
              <User size={18} weight="bold" />
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
