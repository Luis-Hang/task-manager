// Importações.
import { Request, Response } from "express";

import {
    loginSchema,
    registerSchema
} from "../schemas/auth.schema.js";
import { authService } from "../services/auth.service.js";

class AuthController {

    // Registro de usuário.
    // Valida os dados recebidos antes de encaminhá-los para a regra de negócio.
    async register(request: Request, response: Response) {
        const validationResult = registerSchema.safeParse(request.body);

        if (!validationResult.success) {
            return response.status(400).json({
                error: {
                    message: "Invalid registration data.",
                    details: validationResult.error.issues
                }
            });
        }

        const user = await authService.register(validationResult.data);

        return response.status(201).json(user);
    }

    // Login de usuário.
    // Valida as credenciais recebidas antes de encaminhá-las para o serviço de autenticação.
    async login(request: Request, response: Response) {
        const validationResult = loginSchema.safeParse(request.body);

        if (!validationResult.success) {
            return response.status(400).json({
                error: {
                    message: "Invalid login data.",
                    details: validationResult.error.issues
                }
            });
        }

        const authentication = await authService.login(
            validationResult.data
        );

        return response.status(200).json(authentication);
    }
}

// Disponibiliza uma única instância do controller para as rotas.
const authController: AuthController = new AuthController();

// Exportação.
export { authController };