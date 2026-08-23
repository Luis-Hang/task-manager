// Importação.
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.js";

// Define o adaptador responsável pela conexão entre o Prisma e o SQLite.
const adapter = new PrismaBetterSqlite3({
    url: "file:./prisma/dev.db"
})
// Cria uma única instância do Prisma Client para centralizar o acesso ao banco.
const prisma: PrismaClient = new PrismaClient({
    adapter
});

// Disponibiliza a instância do Prisma para as partes da aplicação que precisam acessar o banco.
export { prisma };