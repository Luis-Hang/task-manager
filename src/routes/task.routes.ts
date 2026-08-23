// Importações.
import { Router } from "express";

import { taskController } from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Configuração do roteador.
// Cria o roteador responsável pelos endpoints de tarefas.
const taskRouter: Router = Router();

// Proteção das rotas.
// Garante que todas as rotas deste módulo sejam acessadas apenas por usuários autenticados.
taskRouter.use(authMiddleware);

// Definição das rotas.
// Cria uma nova tarefa para o usuário autenticado.
taskRouter.post("/", (request, response) => {
    return taskController.create(request, response);
});

// Listagem.
// Retorna somente as tarefas pertencentes ao usuário autenticado.
taskRouter.get("/", (request, response) => {
    return taskController.findAll(request, response);
});

// Busca.
// Retorna uma tarefa específica somente quando ela pertence ao usuário autenticado.
taskRouter.get("/:id", (request, response) => {
    return taskController.findById(request, response);
});

// Atualização.
// Altera os campos permitidos de uma tarefa do usuário autenticado.
taskRouter.patch("/:id", (request, response) => {
    return taskController.update(request, response);
});

// Remoção.
// Remove uma tarefa pertencente ao usuário autenticado.
taskRouter.delete("/:id", (request, response) => {
    return taskController.delete(request, response);
});

// Exportação.
// Disponibiliza o roteador para ser registrado na aplicação principal.
export { taskRouter };