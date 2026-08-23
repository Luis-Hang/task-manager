// Importações.
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error.js";

// Validação do identificador.
// Garante que o parâmetro utilizado para identificar a tarefa seja um número inteiro positivo.
function validateTaskId(
    request: Request,
    _response: Response,
    next: NextFunction
): void {
    const taskId: number = Number(request.params.id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
        throw new AppError("Invalid task ID.", 400);
    }

    next();
}

// Exportação.
export { validateTaskId };