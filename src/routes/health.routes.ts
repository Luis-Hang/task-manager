// Importações.
import { Request, Response, Router } from "express";
import { prisma } from "../database/prisma.js";

// Cria o roteador responsável responsável pelas rotas de verificação da API.
const healthRoute: Router = Router();

// Verifica se a API está disponível e responde às requisições.
healthRoute.get("/", async (_request: Request, response: Response) => {
    await prisma.$queryRaw`SELECT 1`;
    return response.status(200).json({
        status: "ok",
        database: "connected"
    });
});

// Disponibiliza o roteador para ser registrado na aplicação.
export { healthRoute };