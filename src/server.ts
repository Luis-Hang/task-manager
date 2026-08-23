// Importa a instância configurada da aplicação.
import { app } from "./app.js";

// Define a porta utilizada pela API.
const PORT: number = 3000;

// Inicia a aplicação e passa a requisições HTTP.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});