import { Router } from "express";
import { createWallet, getAllWallets, getWallet } from "../controllers/walletController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { getWalletByUserId } from "../services/walletService.js";

const walletRouter = Router();

walletRouter.get('/', getAllWallets);
walletRouter.post('/', createWallet);
// Rotas seguras (Autenticação JWT)
walletRouter.get('/:id', verifyJWT, getWallet);
walletRouter.get('/user/:id', verifyJWT, getWalletByUserId);

export default walletRouter;