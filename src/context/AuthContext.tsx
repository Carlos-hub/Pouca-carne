import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

type Papel = "cliente" | "restaurante";

interface Sessao {
  token: string | null;
  id: string | null;
  papel: Papel | null;
}

interface AuthContextValue extends Sessao {
  autenticado: boolean;
  entrar: (dados: { token: string; id: string; papel: Papel }) => void;
  sair: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function lerSessao(): Sessao {
  return {
    token: localStorage.getItem("token"),
    id: localStorage.getItem("id"),
    papel: (localStorage.getItem("papel") as Papel) ?? null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<Sessao>(lerSessao);

  const entrar = useCallback(({ token, id, papel }: { token: string; id: string; papel: Papel }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("papel", papel);
    setSessao({ token, id, papel });
  }, []);

  const sair = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("papel");
    setSessao({ token: null, id: null, papel: null });
  }, []);

  const value = useMemo(
    () => ({ ...sessao, autenticado: Boolean(sessao.token), entrar, sair }),
    [sessao, entrar, sair]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de AuthProvider");
  return ctx;
}
