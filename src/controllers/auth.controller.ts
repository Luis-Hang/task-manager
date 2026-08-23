// Importações.
import { Request, Response } from "express";
import { authService } from "../services/auth.service.js";

// Controller de autenticação.
// Converte as requisições HTTP em chamadas para as regras de negócio de autenticação.
class AuthController {

    // Registro de usuário.
    // Recebe dados previamente validados e solicita a criação do usuário.
    async register(request: Request, response: Response) {
        const user = await authService.register(request.body);

        return response.status(201).json(user);
    }

    // Login de usuário.
    // Recebe credenciais previamente validadas e retorna os dados de autenticação.
    async login(request: Request, response: Response) {
        const authenticationResult = await authService.login(request.body);

        return response.status(200).json(authenticationResult);
    }
}

// Disponibiliza uma única instância do controller para as rotas de autenticação.
const authController: AuthController = new AuthController();

// Exportação.
export { authController };