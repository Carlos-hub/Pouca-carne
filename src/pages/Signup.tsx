import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../components/Input";
import { Botao } from "../components/ui/Botao";
import { api, mensagemDeErro } from "../lib/api";

export function Signup() {
  const navegar = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [datanascimento, setDatanascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirma, setSenhaConfirma] = useState("");
  const [enviando, setEnviando] = useState(false);

  const senhasDiferem = senhaConfirma.length > 0 && senha !== senhaConfirma;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (senhasDiferem) return;

    setEnviando(true);
    try {
      await api.post("/client/signup", { nome, cpf, datanascimento, telefone, email, senha });
      toast.success("Conta criada. Faça login para pedir.");
      navegar("/login");
    } catch (err: any) {
      toast.error(mensagemDeErro(err, "Não foi possível criar a conta"));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AuthLayout
      titulo="Criar conta"
      subtitulo="Leva um minuto. Depois é só escolher e esperar."
      frase="Primeiro pedido em três campos e um clique."
      rodape={
        <>
          Já tem conta?{" "}
          <Link to="/login" className="text-ember underline-offset-4 hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Input rotulo="Nome" placeholder="Seu nome" value={nome} onChange={setNome} required />
        <Input rotulo="Email" type="email" autoComplete="email" placeholder="voce@email.com" value={email} onChange={setEmail} required />
        <div className="grid gap-4 tablet:grid-cols-2">
          <Input rotulo="CPF" inputMode="numeric" placeholder="000.000.000-00" value={cpf} onChange={setCpf} required />
          <Input rotulo="Telefone" inputMode="tel" placeholder="(00) 00000-0000" value={telefone} onChange={setTelefone} required />
        </div>
        <Input rotulo="Data de nascimento" type="date" value={datanascimento} onChange={setDatanascimento} />
        <div className="grid gap-4 tablet:grid-cols-2">
          <Input rotulo="Senha" type="password" autoComplete="new-password" placeholder="Mínimo 6 caracteres" value={senha} onChange={setSenha} required minLength={6} />
          <Input
            rotulo="Repita a senha"
            type="password"
            autoComplete="new-password"
            placeholder="Repita a senha"
            value={senhaConfirma}
            onChange={setSenhaConfirma}
            erro={senhasDiferem ? "As senhas não coincidem" : undefined}
            required
          />
        </div>
        <Botao type="submit" carregando={enviando} disabled={senhasDiferem} className="w-full">
          Criar conta
        </Botao>
      </form>
    </AuthLayout>
  );
}
