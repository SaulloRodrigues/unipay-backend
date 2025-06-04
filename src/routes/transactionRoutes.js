import { Router } from "express";
import { depositTransaction, transferTransaction, withdrawalTransaction } from "../controllers/transactionController.js";

const transactionRouter = Router();

transactionRouter.post('/withdrawal', withdrawalTransaction);
transactionRouter.post('/deposit', depositTransaction);
transactionRouter.post('/transfer', transferTransaction);

export default transactionRouter;