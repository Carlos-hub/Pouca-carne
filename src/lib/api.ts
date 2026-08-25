import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3333",
});

// o token vive no localStorage; o interceptor evita repetir headers em cada chamada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = { ...config.headers, token };
  }
  return config;
});

export function mensagemDeErro(err: any, padrao: string) {
  return err?.response?.data?.message ?? padrao;
}

export function formatarPreco(valor: number | string) {
  const numero = Number(valor);
  if (Number.isNaN(numero)) return "—";
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
