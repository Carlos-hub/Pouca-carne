import { Link } from "react-router-dom";

interface WordmarkProps {
  para?: string;
  tamanho?: "sm" | "lg";
}

export function Wordmark({ para = "/", tamanho = "sm" }: WordmarkProps) {
  const escala = tamanho === "lg" ? "text-3xl tablet:text-4xl" : "text-xl";

  return (
    <Link to={para} className="group inline-flex items-baseline gap-1.5" aria-label="Pouca Carne, início">
      <span className={`font-display font-extrabold uppercase leading-none tracking-[-0.04em] ${escala}`}>
        Pouca
      </span>
      <span
        className={`font-display font-extrabold uppercase leading-none tracking-[-0.04em] text-ember transition-transform duration-300 group-hover:-translate-y-0.5 ${escala}`}
      >
        Carne
      </span>
      <span className="h-1.5 w-1.5 rounded-full bg-mustard" aria-hidden="true" />
    </Link>
  );
}
