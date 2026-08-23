// Importações.
import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

// Configuração do roteador.
// Cria o roteador responsável pelos endpoints de autenticação.
const authRouter: Router = Router();

// Definição das rotas.
// Registra um novo usuário na aplicação.
authRouter.post("/register", (request, response) => {
    return authController.register(request, response);
});

// Autenticação.
// Valida as credenciais do usuário e retorna um token de acesso.
authRouter.post("/login", (request, response) => {
    return authController.login(request, response);
});

// Exportação.
// Disponibiliza o roteador para ser registrado na aplicação.
export { authRouter };

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc4NzQzNTgxOCwiZXhwIjoxNzg3NTIyMjE4fQ.EvAhs6884oMHDjVfD04K-d_ToGq_QfKYL7lzX8I-BTY