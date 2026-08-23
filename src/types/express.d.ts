// Tipagem do Express.
// Adiciona o identificador do usuário autenticado à requisição.
declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export {};