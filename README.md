# API simples com Next.js + PostgreSQL + Prisma

## Regras de negócio implementadas

- Cadastro de clientes com `email` e `telefone`.
- Cadastro de desejos com `itemDesejado` vinculado ao cliente.
- Cadastro de produtos no estoque com `nome` e `caracteristicasGerais`.
- Quando um novo item entra no estoque, a API procura desejos com o mesmo nome (`equals` case insensitive).
- Para cada correspondência, dispara notificação de email e WhatsApp com mensagem simples.

## Endpoints

### `POST /api/desejos`

```json
{
  "email": "cliente@email.com",
  "telefone": "5511999999999",
  "itemDesejado": "Notebook X"
}
```

### `POST /api/estoque`

```json
{
  "nome": "Notebook X",
  "caracteristicasGerais": "16GB RAM, SSD 512GB"
}
```

### `GET /api/health`
Retorna status da API.

## Como rodar

1. Instale dependências:
   ```bash
   npm install
   ```
2. Configure ambiente:
   ```bash
   cp .env.example .env.local
   ```
3. Gere o client do Prisma:
   ```bash
   npx prisma generate
   ```
4. Crie as tabelas no PostgreSQL:
   ```bash
   npx prisma db push
   ```
5. Rode a API:
   ```bash
   npm run dev
   ```

## Observações sobre notificações

- Sem credenciais reais de integração, a API faz log em console no modo mock (`EMAIL-MOCK` e `WHATSAPP-MOCK`).
- Para envio real no WhatsApp (Cloud API da Meta), configure no `.env.local`:
  - `WHATSAPP_PROVIDER_TOKEN`: token de acesso da API.
  - `WHATSAPP_PHONE_NUMBER_ID`: id do número no WhatsApp Business.
- Com as variáveis acima preenchidas, ao cadastrar um produto em `POST /api/estoque`, a API envia mensagem de texto para cada telefone com desejo correspondente.
