// Importações.
import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

// Validação de requisições.
// Cria um middleware reutilizável para validar o corpo da requisição antes do controller.
function validate(schema: ZodType) {
    return (
        request: Request,
        response: Response,
        next: NextFunction
    ): Response | void => {
        const validationResult = schema.safeParse(request.body);

        if (!validationResult.success) {
            return response.status(400).json({
                error: {
                    message: "Invalid request data.",
                    details: validationResult.error.issues
                }
            });
        }

        // Dados validados.
        // Substitui o corpo original pelos dados processados e validados pelo schema.
        request.body = validationResult.data;

        next();
    };
}

// Exportação.
export { validate };