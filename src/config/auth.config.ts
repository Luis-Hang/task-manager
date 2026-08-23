// Configuração da autenticação.
// Obtém a chave utilizada para assinar e validar os tokens JWT.
const jwtSecret: string | undefined = process.env.JWT_SECRET;

// Validação da configuração.
// Impede que a aplicação seja executada sem uma chave secreta configurada.
if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is required.");
}

// Configuração da chave JWT.
// Após a validação, a chave é definida como obrigatória para o restante da aplicação.
const JWT_SECRET: string = jwtSecret;

// Configuração do token.
// Define o tempo de validade dos tokens gerados pela API.
const JWT_EXPIRES_IN = "1d";

// Exportação.
export {
    JWT_SECRET,
    JWT_EXPIRES_IN
};