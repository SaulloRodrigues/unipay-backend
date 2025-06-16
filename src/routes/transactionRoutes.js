import { Router } from "express";
import { depositTransaction, getAllTransactions, getTransaction, getTransactionsByWalletId, transferTransaction, withdrawalTransaction } from "../controllers/transactionController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const transactionRouter = Router();

transactionRouter.get('/', getAllTransactions);
// Rotas seguras (Autenticação JWT)
transactionRouter.get('/:id', verifyJWT, getTransaction);
transactionRouter.get('/wallet/:id', verifyJWT, getTransactionsByWalletId);
transactionRouter.post('/withdrawal', verifyJWT, withdrawalTransaction);
transactionRouter.post('/deposit', verifyJWT, depositTransaction);
transactionRouter.post('/transfer', verifyJWT, transferTransaction);

export default transactionRouter;