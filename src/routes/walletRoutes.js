import { Router } from "express";
import { createWallet, getAllWallets, getWallet } from "../controllers/walletController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const walletRouter = Router();

walletRouter.get('/', getAllWallets);
// Rotas seguras (Autenticação JWT)
walletRouter.get('/:id', verifyJWT, getWallet);
walletRouter.post('/', verifyJWT, createWallet);

export default walletRouter;