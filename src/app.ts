// Importação.
import express, { Express } from "express";
import { healthRoute } from "./routes/health.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { taskRouter } from "./routes/task.routes.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";

// Configuração da aplicação. Cria a instância principal da aplicação.
const app: Express = express();

// Permite que a API interprete corpos de requisições no formato JSON.
app.use(express.json());

// Registra as rotas utilizadas pela API.
app.use("/health", healthRoute);
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);

// Rota não encontrada.
app.use(notFoundMiddleware);

// Tratamento de erros.
app.use(errorMiddleware);

//Disponibiliza a aplicação para ser utilizada pelo servidor.
export { app };