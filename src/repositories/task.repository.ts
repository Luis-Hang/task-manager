// Importações.
import { Task } from "../generated/prisma/client.js";

import { prisma } from "../database/prisma.js";
import {
    CreateTaskInput,
    UpdateTaskInput
} from "../schemas/task.schema.js";

// Repositório de tarefas.
// Centraliza as operações de acesso aos dados das tarefas.
class TaskRepository {

    // Criação de tarefa.
    // Associa a nova tarefa diretamente ao usuário autenticado.
    async create(
        userId: number,
        data: CreateTaskInput
    ): Promise<Task> {
        return prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                userId
            }
        });
    }

    // Listagem de tarefas.
    // Retorna somente as tarefas pertencentes ao usuário informado.
    async findAllByUserId(userId: number): Promise<Task[]> {
        return prisma.task.findMany({
            where: {
                userId
            }
        });
    }

    // Busca de tarefa.
    // Combina o identificador da tarefa com o proprietário para impedir acesso entre usuários.
    async findByIdAndUserId(
        taskId: number,
        userId: number
    ): Promise<Task | null> {
        return prisma.task.findFirst({
            where: {
                id: taskId,
                userId
            }
        });
    }

    // Atualização de tarefa.
    // Localiza a tarefa pelo identificador e pelo proprietário antes de aplicar alterações.
    async update(
        taskId: number,
        userId: number,
        data: UpdateTaskInput
    ): Promise<Task | null> {
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                userId
            }
        });

        if (!task) {
            return null;
        }

        return prisma.task.update({
            where: {
                id: taskId
            },
            data
        });
    }

    // Remoção de tarefa.
    // Localiza a tarefa pelo identificador e pelo proprietário antes de removê-la.
    async delete(
        taskId: number,
        userId: number
    ): Promise<Task | null> {
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                userId
            }
        });

        if (!task) {
            return null;
        }

        return prisma.task.delete({
            where: {
                id: taskId
            }
        });
    }
}

// Exportação.
// Disponibiliza uma única instância do repositório para os serviços de tarefas.
const taskRepository: TaskRepository = new TaskRepository();

export { taskRepository };