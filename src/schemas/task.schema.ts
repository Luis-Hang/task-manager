// Importações.
import { z } from "zod";

// Criação de tarefa.
// Define os dados aceitos ao criar uma nova tarefa.
const createTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required."),

    description: z
        .string()
        .trim()
        .optional()
});

// Atualização de tarefa.
// Permite alterar somente os campos definidos pelo desafio.
const updateTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title must not be empty.")
        .optional(),

    description: z
        .string()
        .trim()
        .optional(),

    done: z
        .boolean()
        .optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field must be provided."
    }
);

// Tipagem.
// Gera os tipos utilizados pelos serviços a partir das regras de validação.
type CreateTaskInput = z.infer<typeof createTaskSchema>;
type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

// Exportação.
export {
    createTaskSchema,
    updateTaskSchema,
    CreateTaskInput,
    UpdateTaskInput
};