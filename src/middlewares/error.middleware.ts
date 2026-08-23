// Importações.
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error.js";

// Tratamento de erros.
// Centraliza a conversão dos erros da aplicação em respostas HTTP padronizadas.
function errorMiddleware(
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
) {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            error: {
                message: error.message
            }
        });
    }
    console.error(error);
    return response.status(500).json({
        error: {
            message: "Internal server error."
        }
    });
}

// Exportação.
export { errorMiddleware };