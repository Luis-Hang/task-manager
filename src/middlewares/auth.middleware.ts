// Importações.
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { JWT_SECRET } from "../config/auth.config.js";
import { AppError } from "../errors/app.error.js";

// Autenticação.
// Valida o token JWT enviado pelo usuário antes de liberar o acesso às rotas protegidas.
function authMiddleware(
    request: Request,
    _response: Response,
    next: NextFunction
): void {
    const authorizationHeader: string | undefined =
        request.headers.authorization;

    // Validação do cabeçalho.
    // Impede o acesso quando a requisição não possui credenciais.
    if (!authorizationHeader) {
        throw new AppError("Authentication token is required.", 401);
    }

    const [type, token] = authorizationHeader.split(" ");

    // Validação do formato.
    // Aceita somente tokens enviados no padrão Authorization: Bearer TOKEN.
    if (type !== "Bearer" || !token) {
        throw new AppError("Invalid authentication token.", 401);
    }

    try {
        const decodedToken: string | JwtPayload = jwt.verify(
            token,
            JWT_SECRET
        );

        // Validação do conteúdo.
        // Garante que o token contém o identificador do usuário utilizado pela aplicação.
        if (
            typeof decodedToken === "string" ||
            !decodedToken.sub ||
            typeof decodedToken.sub !== "number"
        ) {
            throw new AppError("Invalid authentication token.", 401);
        }

        // Identificação do usuário.
        // Disponibiliza o identificador do usuário autenticado para as rotas protegidas.
        request.userId = decodedToken.sub;

        next();
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError(
            "Invalid or expired authentication token.",
            401
        );
    }
}

// Exportação.
export { authMiddleware };