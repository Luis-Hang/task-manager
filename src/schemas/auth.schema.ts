// Importações.
import { z } from "zod";

// Define os campos obrigatórios e as regras para criação de um novo usuário.
const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required"),

    email: z
        .email("Invalid email address.")
        .trim(),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters long.")
}).strict();

// Validação do login.
// Define os campos necessários para autenticar um usuário.
const loginSchema = z.object({
    email: z
        .email("Invalid email address.")
        .trim(),

    password: z
        .string()
        .min(1, "Password is required.")
}).strict();

// Tipagem.
// Gera o tipo TypeScript utilizado durante a autenticação.
type LoginInput = z.infer<typeof loginSchema>;

// Gere o tipo TypeScript diretamente a partir das regras de validação.
type RegisterInput = z.infer<typeof registerSchema>;

//Exportação.
export {
    registerSchema,
    loginSchema,
    RegisterInput,
    LoginInput
};