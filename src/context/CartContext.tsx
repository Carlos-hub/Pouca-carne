import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface ItemCarrinho {
  id: string;
  nome: string;
  imagem: string;
  valor: number;
  quantidade: number;
}

interface CartContextValue {
  itens: ItemCarrinho[];
  quantidadeTotal: number;
  valorTotal: number;
  aberto: boolean;
  abrir: () => void;
  fechar: () => void;
  adicionar: (produto: Omit<ItemCarrinho, "quantidade">) => void;
  alterarQuantidade: (id: string, delta: number) => void;
  remover: (id: string) => void;
  limpar: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const CHAVE = "carrinho";

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(CHAVE) ?? "[]");
    } catch {
      return [];
    }
  });
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    localStorage.setItem(CHAVE, JSON.stringify(itens));
  }, [itens]);

  const adicionar = useCallback((produto: Omit<ItemCarrinho, "quantidade">) => {
    setItens((atuais) => {
      const existente = atuais.find((item) => item.id === produto.id);
      if (existente) {
        return atuais.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...atuais, { ...produto, quantidade: 1 }];
    });
  }, []);

  const alterarQuantidade = useCallback((id: string, delta: number) => {
    setItens((atuais) =>
      atuais
        .map((item) => (item.id === id ? { ...item, quantidade: item.quantidade + delta } : item))
        .filter((item) => item.quantidade > 0)
    );
  }, []);

  const remover = useCallback((id: string) => {
    setItens((atuais) => atuais.filter((item) => item.id !== id));
  }, []);

  const limpar = useCallback(() => setItens([]), []);

  const value = useMemo(() => {
    const quantidadeTotal = itens.reduce((soma, item) => soma + item.quantidade, 0);
    const valorTotal = itens.reduce((soma, item) => soma + item.valor * item.quantidade, 0);
    return {
      itens,
      quantidadeTotal,
      valorTotal,
      aberto,
      abrir: () => setAberto(true),
      fechar: () => setAberto(false),
      adicionar,
      alterarQuantidade,
      remover,
      limpar,
    };
  }, [itens, aberto, adicionar, alterarQuantidade, remover, limpar]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de CartProvider");
  return ctx;
}
