import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RotaProtegidaProps {
  papel: "cliente" | "restaurante";
  children: ReactNode;
}

export function RotaProtegida({ papel, children }: RotaProtegidaProps) {
  const auth = useAuth();
  const local = useLocation();
  const destino = papel === "restaurante" ? "/adm/login" : "/login";

  if (!auth.autenticado || (auth.papel && auth.papel !== papel)) {
    return <Navigate to={destino} state={{ de: local.pathname }} replace />;
  }

  return <>{children}</>;
}
