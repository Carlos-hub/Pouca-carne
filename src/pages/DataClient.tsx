import { MapPin, User } from "phosphor-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Botao } from "../components/ui/Botao";
import { Skeleton } from "../components/ui/Skeleton";
import { api, mensagemDeErro } from "../lib/api";

interface IClient {
  id?: string;
  nome?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
  dataNascimento?: string;
  endereco?: string;
  cep?: string;
}

export function DataClient() {
  const [dados, setDados] = useState<IClient>({});
  const [carregando, setCarregando] = useState(true);
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [salvando, setSalvando] = useState(false);

  const buscar = useCallback(async () => {
    try {
      const res = await api.get<IClient>("/client/data");
      setDados(res.data);
      setCep(res.data.cep ?? "");
      setEndereco(res.data.endereco ?? "");
    } catch (err: any) {
      toast.error(mensagemDeErro(err, "Não foi possível carregar seus dados"));
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    buscar();
  }, [buscar]);

  async function salvarEndereco(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    try {
      await api.post("/client/endereco", { nome_rua: endereco, cep });
      toast.success("Endereço salvo");
      buscar();
    } catch (err: any) {
      toast.error(mensagemDeErro(err, "Não foi possível salvar o endereço"));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 border-b border-grill pb-4">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-mustard">Sua conta</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.04em]">Meus dados</h1>
        </div>

        <div className="grid gap-6 laptop:grid-cols-2">
          <article className="rounded-2xl border border-grill bg-smoke p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
              <User size={22} weight="bold" className="text-ember" />
              Cadastro
            </h2>

            {carregando ? (
              <div className="mt-6 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            ) : (
              <dl className="mt-6 divide-y divide-grill">
                {[
                  ["Nome", dados.nome],
                  ["Email", dados.email],
                  ["CPF", dados.cpf],
                  ["Telefone", dados.telefone],
                  ["Nascimento", dados.dataNascimento],
                ].map(([rotulo, valor]) => (
                  <div key={rotulo} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="font-mono text-xs uppercase tracking-[0.18em] text-ash">{rotulo}</dt>
                    <dd className="truncate text-right">{valor || "—"}</dd>
                  </div>
                ))}
              </dl>
            )}
          </article>

          <article className="rounded-2xl border border-grill bg-smoke p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
              <MapPin size={22} weight="bold" className="text-ember" />
              Endereço de entrega
            </h2>
            <p className="mt-2 text-sm text-ash">
              {dados.endereco ? "Salve de novo para atualizar." : "Cadastre um endereço antes do primeiro pedido."}
            </p>

            <form onSubmit={salvarEndereco} className="mt-6 space-y-4">
              <Input rotulo="CEP" inputMode="numeric" placeholder="00000-000" value={cep} onChange={setCep} required />
              <Input rotulo="Rua e número" placeholder="Rua das Hamburguerias, 42" value={endereco} onChange={setEndereco} required />
              <Botao type="submit" carregando={salvando} className="w-full">
                Salvar endereço
              </Botao>
            </form>
          </article>
        </div>
      </section>
    </div>
  );
}
