// Importações.
import { Request, Response } from "express";

import { AppError } from "../errors/app.error.js";
import {
    createTaskSchema,
    updateTaskSchema
} from "../schemas/task.schema.js";
import { taskService } from "../services/task.service.js";

// Controller de tarefas.
// Converte as requisições HTTP em chamadas para as regras de negócio das tarefas.
class TaskController {

    // Criação de tarefa.
    // Valida os dados e vincula a nova tarefa ao usuário identificado pelo token.
    async create(request: Request, response: Response) {
        const validationResult = createTaskSchema.safeParse(request.body);

        if (!validationResult.success) {
            return response.status(400).json({
                error: {
                    message: "Invalid task data.",
                    details: validationResult.error.issues
                }
            });
        }

        const userId: number | undefined = request.userId;

        if (!userId) {
            throw new AppError("Authentication required.", 401);
        }

        const task = await taskService.create(
            userId,
            validationResult.data
        );

        return response.status(201).json(task);
    }

    // Listagem de tarefas.
    // Utiliza exclusivamente o identificador obtido do token para buscar as tarefas.
    async findAll(request: Request, response: Response) {
        const userId: number | undefined = request.userId;

        if (!userId) {
            throw new AppError("Authentication required.", 401);
        }

        const tasks = await taskService.findAll(userId);

        return response.status(200).json(tasks);
    }

    // Busca de uma tarefa.
    // Combina o ID da URL com o usuário autenticado para preservar o isolamento dos dados.
    async findById(request: Request, response: Response) {
        const taskId: number = Number(request.params.id);
        const userId: number | undefined = request.userId;

        if (!userId) {
            throw new AppError("Authentication required.", 401);
        }

        if (!Number.isInteger(taskId) || taskId <= 0) {
            throw new AppError("Invalid task ID.", 400);
        }

        const task = await taskService.findById(taskId, userId);

        return response.status(200).json(task);
    }

    // Atualização de tarefa.
    // Valida os campos permitidos e garante que a operação use o usuário autenticado.
    async update(request: Request, response: Response) {
        const taskId: number = Number(request.params.id);
        const userId: number | undefined = request.userId;

        if (!userId) {
            throw new AppError("Authentication required.", 401);
        }

        if (!Number.isInteger(taskId) || taskId <= 0) {
            throw new AppError("Invalid task ID.", 400);
        }

        const validationResult = updateTaskSchema.safeParse(request.body);

        if (!validationResult.success) {
            return response.status(400).json({
                error: {
                    message: "Invalid task update data.",
                    details: validationResult.error.issues
                }
            });
        }

        const task = await taskService.update(
            taskId,
            userId,
            validationResult.data
        );

        return response.status(200).json(task);
    }

    // Remoção de tarefa.
    // Executa a remoção utilizando o ID da tarefa e o proprietário autenticado.
    async delete(request: Request, response: Response) {
        const taskId: number = Number(request.params.id);
        const userId: number | undefined = request.userId;

        if (!userId) {
            throw new AppError("Authentication required.", 401);
        }

        if (!Number.isInteger(taskId) || taskId <= 0) {
            throw new AppError("Invalid task ID.", 400);
        }

        await taskService.delete(taskId, userId);

        return response.status(204).send();
    }
}

// Exportação.
// Disponibiliza uma única instância do controller para as rotas de tarefas.
const taskController: TaskController = new TaskController();

export { taskController };