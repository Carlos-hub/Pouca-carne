import { Lock, User } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../components/Input";
import { Botao } from "../components/ui/Botao";
import { useAuth } from "../context/AuthContext";
import { api, mensagemDeErro } from "../lib/api";

export function LoginAdm() {
  const navegar = useNavigate();
  const { entrar } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    try {
      const res = await api.post("/company/login", { email, senha });
      entrar({ token: res.data.token, id: res.data.decodes.payload.sub, papel: "restaurante" });
      navegar("/shop/adm");
    } catch (err: any) {
      toast.error(
        mensagemDeErro(err, "Credentials invalid") === "Credentials invalid"
          ? "Email ou senha incorretos"
          : mensagemDeErro(err, "Não foi possível entrar")
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AuthLayout
      titulo="Painel da cozinha"
      subtitulo="Entre para ver as comandas em tempo real."
      frase="Toda comanda começa aqui, no barulho da chapa."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          rotulo="Email"
          type="email"
          autoComplete="email"
          placeholder="cozinha@poucacarne.com"
          value={email}
          onChange={setEmail}
          icone={<User size={20} />}
          required
        />
        <Input
          rotulo="Senha"
          type="password"
          autoComplete="current-password"
          placeholder="Sua senha"
          value={senha}
          onChange={setSenha}
          icone={<Lock size={20} />}
          required
        />
        <Botao type="submit" carregando={enviando} className="w-full">
          Acessar painel
        </Botao>
      </form>
    </AuthLayout>
  );
}
