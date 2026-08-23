// Representa erros esperados que devem retornar uma resposta HTTP específica.
class AppError extends Error {

    // Informações do erro.
    // Armazena o código HTTP associado ao erro.
    public readonly statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

// Exportação.
export { AppError };