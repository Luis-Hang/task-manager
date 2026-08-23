// Importações.
import { Request, Response } from "express";

// Rota não encontrada.
// Padroniza a resposta quando nenhuma rota registrada corresponde a requisição.
function notFoundMiddleware(
    _request: Request,
    response: Response
): Response {
    return response.status(404).json({
        error: {
            message: "Route not found."
        }
    });
}

// Exportação.
export { notFoundMiddleware };