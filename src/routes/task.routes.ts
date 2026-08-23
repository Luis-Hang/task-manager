// Importações.
import { Router } from "express";
import { taskController } from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validateTaskId } from "../middlewares/validate-task-id.middleware.js";
import {
    createTaskSchema,
    updateTaskSchema
} from "../schemas/task.schema.js";

// Configuração do roteador.
// Cria o roteador responsável pelos endpoints de tarefas.
const taskRouter: Router = Router();

// Proteção das rotas.
// Garante que todas as rotas deste módulo sejam acessadas apenas por usuários autenticados.
taskRouter.use(authMiddleware);

// Criação.
// Valida os dados e cria uma nova tarefa para o usuário autenticado.
taskRouter.post(
    "/",
    validate(createTaskSchema),
    (request, response) => {
        return taskController.create(request, response);
    }
);

// Listagem.
// Retorna somente as tarefas pertencentes ao usuário autenticado.
taskRouter.get("/", (request, response) => {
    return taskController.findAll(request, response);
});

// Busca.
// Valida o identificador antes de buscar uma tarefa pertencente ao usuário autenticado.
taskRouter.get(
    "/:id",
    validateTaskId,
    (request, response) => {
        return taskController.findById(request, response);
    }
);

// Atualização.
// Valida o identificador e os campos enviados antes de atualizar a tarefa.
taskRouter.patch(
    "/:id",
    validateTaskId,
    validate(updateTaskSchema),
    (request, response) => {
        return taskController.update(request, response);
    }
);

// Remoção.
// Valida o identificador antes de remover uma tarefa pertencente ao usuário autenticado.
taskRouter.delete(
    "/:id",
    validateTaskId,
    (request, response) => {
        return taskController.delete(request, response);
    }
);

// Exportação.
// Disponibiliza o roteador para ser registrado na aplicação principal.
export { taskRouter };