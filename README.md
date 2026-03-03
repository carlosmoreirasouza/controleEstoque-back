# API simples com Next.js + PostgreSQL

## Regras de negócio implementadas

- Cadastro de desejos com `email`, `telefone` e `itemDesejado`.
- Cadastro de produtos no estoque com `nome` e `caracteristicasGerais`.
- Quando um novo item entra no estoque, a API procura desejos com o mesmo nome (`LOWER(item_desejado) = LOWER(nome)`).
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
3. Crie as tabelas no PostgreSQL:
   ```bash
   psql "$DATABASE_URL" -f db/schema.sql
   ```
4. Rode a API:
   ```bash
   npm run dev
   ```

## Observações sobre notificações

- Sem credenciais reais de integração, a API faz log em console no modo mock (`EMAIL-MOCK` e `WHATSAPP-MOCK`).
- Com integrações configuradas, você pode substituir os `console.log` em `lib/notification.ts` por chamadas reais (Nodemailer, Twilio etc).
