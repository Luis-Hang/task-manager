// Importações.
import { AppError } from "../errors/app.error.js";
import { taskRepository } from "../repositories/task.repository.js";
import {
    CreateTaskInput,
    UpdateTaskInput
} from "../schemas/task.schema.js";

// Serviço de tarefas.
// Centraliza as regras de negócio relacionadas às tarefas dos usuários.
class TaskService {

    // Criação de tarefa.
    // Cria uma nova tarefa vinculada ao usuário autenticado.
    async create(
        userId: number,
        data: CreateTaskInput
    ) {
        return taskRepository.create(userId, data);
    }

    // Listagem de tarefas.
    // Retorna somente as tarefas pertencentes ao usuário autenticado.
    async findAll(userId: number) {
        return taskRepository.findAllByUserId(userId);
    }

    // Busca de tarefa.
    // Retorna a tarefa somente quando ela pertence ao usuário autenticado.
    async findById(
        taskId: number,
        userId: number
    ) {
        const task = await taskRepository.findByIdAndUserId(
            taskId,
            userId
        );

        if (!task) {
            throw new AppError("Task not found.", 404);
        }

        return task;
    }

    // Atualização de tarefa.
    // Permite alterar uma tarefa somente quando ela pertence ao usuário autenticado.
    async update(
        taskId: number,
        userId: number,
        data: UpdateTaskInput
    ) {
        const task = await taskRepository.update(
            taskId,
            userId,
            data
        );

        if (!task) {
            throw new AppError("Task not found.", 404);
        }

        return task;
    }

    // Remoção de tarefa.
    // Remove uma tarefa somente quando ela pertence ao usuário autenticado.
    async delete(
        taskId: number,
        userId: number
    ) {
        const task = await taskRepository.delete(
            taskId,
            userId
        );

        if (!task) {
            throw new AppError("Task not found.", 404);
        }
    }
}

// Exportação.
// Disponibiliza uma única instância do serviço para os controllers de tarefas.
const taskService: TaskService = new TaskService();

export { taskService };