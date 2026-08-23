// Importação.
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.js";

// Configuração do banco.
// Obtém a localização do banco SQLite definida nas variáveis de ambiente.
const DATABASE_URL: string = process.env.DATABASE_URL ?? "file:./prisma/dev.db";

// Define o adaptador responsável pela conexão entre o Prisma e o SQLite.
const adapter = new PrismaBetterSqlite3({
    url: DATABASE_URL
});

// Cria uma única instância do Prisma Client para centralizar o acesso ao banco.
const prisma: PrismaClient = new PrismaClient({
    adapter
});

// Disponibiliza a instância do Prisma para as partes da aplicação que precisam acessar o banco.
export { prisma };