// Importações.
import { User } from "../generated/prisma/client.js";
import { prisma } from "../database/prisma.js";
import { string } from "zod";

// Centraliza as operações de acesso aos dados dos usuários.
class UserRepository {
    // Busca um usuário pelo endereço de e-mail.
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    // Cria um novo usuário com a senha já convertida em hash.
    async create(
        name: string,
        email: string,
        passwordHash: string
    ): Promise<User>{
        return prisma.user.create({
            data: {
                name,
                email,
                passwordHash
            }
        });
    }
}

// Exportação.
// Disponibiliza uma única instância do repositório para a aplicação.
const userRepository: UserRepository = new UserRepository();
export { userRepository };