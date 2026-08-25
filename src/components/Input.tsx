import { InputHTMLAttributes, ReactNode, useId } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  rotulo: string;
  icone?: ReactNode;
  erro?: string;
  onChange: (valor: string) => void;
}

export function Input({ rotulo, icone, erro, onChange, className = "", ...props }: InputProps) {
  const id = useId();

  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ash">
        {rotulo}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-char/60 px-3 transition-colors duration-200
          focus-within:border-ember ${erro ? "border-ember" : "border-grill"}`}
      >
        <input
          {...props}
          id={id}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-transparent py-2.5 text-cream placeholder:text-ash/50 focus:outline-none ${className}`}
        />
        {icone && <span className="shrink-0 text-ash">{icone}</span>}
      </div>
      {erro && <p className="mt-1 text-sm text-ember">{erro}</p>}
    </div>
  );
}
