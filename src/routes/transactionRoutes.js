import { Router } from "express";
import { depositTransaction, getAllTransactions, getTransaction, getTransactionsByWalletId, transferTransaction, withdrawalTransaction } from "../controllers/transactionController.js";

const transactionRouter = Router();

transactionRouter.get('/', getAllTransactions);
transactionRouter.get('/:id', getTransaction);
transactionRouter.get('/wallet/:id', getTransactionsByWalletId);
transactionRouter.post('/withdrawal', withdrawalTransaction);
transactionRouter.post('/deposit', depositTransaction);
transactionRouter.post('/transfer', transferTransaction);

export default transactionRouter;