// Define a chave utilizada para assinar e validar os tokens JWT.
const JWT_SECRET: string = process.env.JWT_SECRET ?? "development-secret";

// Define o tempo de validade dos tokens gerados pela API.
const JWT_EXPIRES_IN = "1d";

// Exportação.
export {
    JWT_SECRET,
    JWT_EXPIRES_IN
};