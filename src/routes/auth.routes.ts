// Importações.
import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
    loginSchema,
    registerSchema
} from "../schemas/auth.schema.js";

// Configuração do roteador.
// Cria o roteador responsável pelos endpoints de autenticação.
const authRouter: Router = Router();

// Registro.
// Valida os dados antes de criar um novo usuário.
authRouter.post(
    "/register",
    validate(registerSchema),
    (request, response) => {
        return authController.register(request, response);
    }
);

// Login.
// Valida as credenciais antes de autenticar o usuário.
authRouter.post(
    "/login",
    validate(loginSchema),
    (request, response) => {
        return authController.login(request, response);
    }
);

// Exportação.
// Disponibiliza o roteador para ser registrado na aplicação principal.
export { authRouter };