// Importações.
import { Request, Response } from "express";
import { AppError } from "../errors/app.error.js";
import { taskService } from "../services/task.service.js";

// Controller de tarefas.
// Converte as requisições HTTP em chamadas para as regras de negócio das tarefas.
class TaskController {

    // Criação de tarefa.
    // Recebe dados já validados pelo middleware e vincula a tarefa ao usuário autenticado.
    async create(request: Request, response: Response) {
        const userId: number | undefined = request.userId;

        if (!userId) {
            throw new AppError("Authentication required.", 401);
        }

        const task = await taskService.create(
            userId,
            request.body
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

        const task = await taskService.findById(taskId, userId);
        return response.status(200).json(task);
    }

    // Atualização de tarefa.
    // Recebe somente campos previamente validados antes de atualizar a tarefa.
    async update(request: Request, response: Response) {
        const taskId: number = Number(request.params.id);
        const userId: number | undefined = request.userId;

        if (!userId) {
            throw new AppError("Authentication required.", 401);
        }

        const task = await taskService.update(
            taskId,
            userId,
            request.body
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

        await taskService.delete(taskId, userId);
        return response.status(204).send();
    }
}

// Disponibiliza uma única instância do controller para as rotas de tarefas.
const taskController: TaskController = new TaskController();

// Exportação.
export { taskController };