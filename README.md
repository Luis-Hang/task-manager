# Task Manager API

REST API para gerenciamento de tarefas, desenvolvida com Node.js, TypeScript, Express, Prisma e SQLite.

A aplicação permite que usuários se cadastrem, realizem login e gerenciem suas próprias tarefas de forma autenticada.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- JWT
- bcryptjs
- Zod

## Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Criptografia de senhas com bcrypt
- Criação de tarefas
- Listagem de tarefas do usuário autenticado
- Busca de tarefa por ID
- Atualização de tarefas
- Remoção de tarefas
- Isolamento de dados entre usuários
- Validação de dados com Zod
- Tratamento centralizado de erros
- Verificação de saúde da API e conexão com o banco de dados

## Estrutura do projeto

```text
src/
├── config/          # Configurações da aplicação
├── controllers/     # Camada responsável pelas requisições HTTP
├── database/        # Configuração do banco de dados
├── errors/          # Erros personalizados
├── middlewares/     # Middlewares da aplicação
├── repositories/    # Acesso aos dados
├── routes/          # Definição das rotas
├── schemas/         # Validação dos dados
├── services/        # Regras de negócio
├── types/           # Tipagens personalizadas
├── app.ts           # Configuração da aplicação Express
└── server.ts        # Inicialização do servidor

prisma/
├── migrations/      # Histórico das migrations
└── schema.prisma    # Schema do banco de dados
````

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* Node.js
* npm

## Instalação

Clone o repositório:

```bash
git clone https://github.com/Luis-Hang/task-manager.git
```

Acesse a pasta do projeto:

```bash
cd task-manager
```

Instale as dependências:

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="substitua_por_uma_chave_secreta_segura"
PORT=3000
```

## Banco de dados

Gere o Prisma Client:

```bash
npm run prisma:generate
```

Aplique as migrations:

```bash
npm run prisma:migrate
```

## Executando o projeto

### Desenvolvimento

```bash
npm run dev
```

### Compilação

```bash
npm run build
```

### Produção

```bash
npm start
```

A API estará disponível em:

```text
http://localhost:3000
```

## Endpoints

### Health Check

#### GET /health

Verifica se a API está funcionando e se a conexão com o banco de dados está disponível.

Resposta:

```json
{
  "status": "ok",
  "database": "connected"
}
```

---

## Autenticação

### POST /auth/register

Cria um novo usuário.

Body:

```json
{
  "name": "Nome",
  "email": "nome@example.com",
  "password": "123456"
}
```

Resposta de sucesso:

```json
{
  "id": 1,
  "name": "Nome",
  "email": "nome@example.com",
  "createdAt": "2026-08-23T13:50:17.124Z"
}
```

### POST /auth/login

Autentica um usuário e retorna um token JWT.

Body:

```json
{
  "email": "nome@example.com",
  "password": "123456"
}
```

Resposta de sucesso:

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "Nome",
    "email": "nome@example.com"
  }
}
```

---

## Tarefas

Todas as rotas de tarefas exigem autenticação.

Envie o token no header:

```text
Authorization: Bearer SEU_TOKEN_JWT
```

### POST /tasks

Cria uma nova tarefa.

Body:

```json
{
  "title": "Tarefa",
  "description": "Descrição da tarefa."
}
```

### GET /tasks

Retorna todas as tarefas do usuário autenticado.

### GET /tasks/:id

Retorna uma tarefa específica pertencente ao usuário autenticado.

### PATCH /tasks/:id

Atualiza uma tarefa.

Exemplo:

```json
{
  "title": "Novo título",
  "done": true
}
```

### DELETE /tasks/:id

Remove uma tarefa.

Resposta:

```text
204 No Content
```

## Segurança

A API implementa as seguintes medidas de segurança:

* Senhas armazenadas utilizando hash com bcrypt
* Autenticação utilizando JWT
* Rotas de tarefas protegidas por middleware de autenticação
* Tarefas vinculadas ao usuário autenticado
* Um usuário não pode acessar, alterar ou remover tarefas de outro usuário
* Campos não permitidos são rejeitados pela validação
* Dados de entrada validados com Zod
* Erros tratados de forma centralizada
* Variáveis sensíveis mantidas fora do controle de versão

## Códigos HTTP utilizados

| Código | Descrição                         |
| ------ | --------------------------------- |
| 200    | Requisição realizada com sucesso  |
| 201    | Recurso criado com sucesso        |
| 204    | Recurso removido com sucesso      |
| 400    | Dados inválidos                   |
| 401    | Não autenticado ou token inválido |
| 404    | Recurso não encontrado            |
| 409    | E-mail já utilizado               |
| 500    | Erro interno do servidor          |

## Licença

Este projeto foi desenvolvido para fins de estudo e avaliação técnica.