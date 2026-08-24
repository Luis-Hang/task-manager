// Carrega as variáveis de ambiente antes de importar a aplicação.
import "dotenv/config";

// Importa a instância configurada da aplicação.
import { app } from "./app.js";

// Define a porta utilizada pela API.
const PORT: number = Number(process.env.PORT) || 3000;

// Inicialização do servidor.
// Inicia a aplicação e passa a aceitar requisições HTTP.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});