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

// Middlewares essencias/segurança para as rotas.
app.use(express.json());
// Configurações de cross-origin
app.use(cors());
// Proteção contra ataques HTTP
app.use(helmet());
// Logs das requisições
app.use(morgan('dev'));
// Utilização de cookies. 
app.use(cookieParser());

// Middlewares de registro das rotas.
app.use('/users', userRouter);
app.use('/wallets', walletRouter);
app.use('/transactions', transactionRouter);

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
});