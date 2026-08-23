// Importações.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
    JWT_EXPIRES_IN,
    JWT_SECRET
} from "../config/auth.config.js";
import { AppError } from "../errors/app.error.js";
import { userRepository } from "../repositories/user.repository.js";
import {
    LoginInput,
    RegisterInput
} from "../schemas/auth.schema.js";

// Configuração do serviço.
// Define a quantidade de rounds utilizada para gerar o hash da senha.
const SALT_ROUNDS: number = 10;

class AuthService {

    // Registro de usuário.
    // Cria um novo usuário após verificar se o e-mail já está sendo utilizado.
    async register(data: RegisterInput) {
        const existingUser = await userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new AppError("Email is already in use.", 409);
        }

        // Geração do hash da senha.
        // Impede que a senha original seja armazenada no banco de dados.
        const passwordHash: string = await bcrypt.hash(
            data.password,
            SALT_ROUNDS
        );

        const user = await userRepository.create(
            data.name,
            data.email,
            passwordHash
        );

        // Retorno do usuário.
        // Retorna somente informações que podem ser expostas pela API.
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };
    }

    // Login de usuário.
    // Verifica as credenciais e gera um token para acessar as rotas protegidas.
    async login(data: LoginInput) {
        const user = await userRepository.findByEmail(data.email);

        if (!user) {
            throw new AppError("Invalid email or password.", 401);
        }

        const passwordMatches: boolean = await bcrypt.compare(
            data.password,
            user.passwordHash
        );

        if (!passwordMatches) {
            throw new AppError("Invalid email or password.", 401);
        }

        // Geração do token.
        // Utiliza o identificador do usuário como subject para vincular o token ao usuário autenticado.
        const token: string = jwt.sign(
            {
                sub: user.id
            },
            JWT_SECRET,
            {
                expiresIn: JWT_EXPIRES_IN
            }
        );

        // Retorno da autenticação.
        // Expõe somente os dados necessários para o cliente utilizar a sessão.
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }
}

// Disponibiliza uma única instância do serviço de autenticação.
const authService: AuthService = new AuthService();

// Exportação.
export { authService };