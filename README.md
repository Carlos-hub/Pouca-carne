# Pouca-carne


### Tela de Cadastro

<div align="center">
<img src="https://user-images.githubusercontent.com/54721824/213592361-017e952e-652d-4cd7-9f37-5f32ac56d151.png" width="700px" />
</div>

### Tela de Login
<div align="center">
<img src="https://user-images.githubusercontent.com/54721824/213592324-cc42443f-f1ae-43e2-8326-4a3ce96dccfd.png" width="700px" />
</div>
### Tela de cardapio logado
<div align="center">
<img src="https://user-images.githubusercontent.com/54721824/213592396-dedc73cd-86c1-4842-bca9-e290d0ed475a.png" width="700px" />
</div>
### Tela de cardapio sem Logar
<div align="center">
<img src="https://user-images.githubusercontent.com/54721824/213592400-449b233c-7c07-4dd0-ba9d-524f31d88da2.png" width="700px"/>
</div>

### Tela de Pedidos
<div align="center">
<img src="https://user-images.githubusercontent.com/54721824/213592403-1ce428ec-63a8-4f35-9873-799e93b85730.png" width="700px"/>
</div>


## Como rodar

O front-end sobe junto com a API pelo Compose do repositório `serveless-pouca-carne`,
que precisa estar clonado ao lado deste:

```bash
cd ../serveless-pouca-carne
docker compose up -d --build
```

A interface fica em http://localhost:5173.

Para rodar só o front-end, com a API em outro lugar:

```bash
npm install
VITE_API_URL=https://sua-api npm run dev
```

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base da API (padrão `http://localhost:3333`) |

## Rotas

| Rota | Quem acessa |
|---|---|
| `/` | Cardápio, aberto |
| `/login`, `/signup` | Cliente |
| `/pedidos`, `/dados` | Cliente autenticado |
| `/adm/login` | Restaurante |
| `/shop/adm`, `/adm/product` | Restaurante autenticado |

## Interface

- Paleta de brasa (marrom carbonizado, laranja, mostarda, verde picles) com Bricolage Grotesque,
  Instrument Sans e JetBrains Mono.
- Os pedidos aparecem como comandas de cozinha: papel picotado, tipografia monoespaçada e
  selo de status carimbado.
- Sacola com quantidades e forma de pagamento, busca no cardápio, skeletons no carregamento,
  atualização otimista ao confirmar ou cancelar e recarga automática do status.
- Sessão e sacola ficam em contextos React, então o cabeçalho reage a login, logout e à sacola
  sem recarregar a página.
