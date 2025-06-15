import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import helmet from 'helmet';
import userRouter from './routes/userRoutes.js';
import walletRouter from './routes/walletRoutes.js';
import transactionRouter from './routes/transactionRoutes.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.APP_PORT || 3000

// Middlewares para preparar o Express para uso:
// - Express.JSON faz o parser do body para JSON;
// - CORS para permitir requisições de outras origens;
// - Helmet para reforçar na segurança;
// - Morgan para registrar as requests no console;
// - CookieParser para trabalhar com cookies.
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

// Registra as rotas da aplicação
app.use('/users', userRouter);
app.use('/wallets', walletRouter);
app.use('/transactions', transactionRouter);

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
});