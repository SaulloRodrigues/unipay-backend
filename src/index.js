import express from 'express';
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config'

const app = express();
const port = process.env.APP_PORT || 3000

// Registrando as rotas do usuário.
userRoutes(app);

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
});