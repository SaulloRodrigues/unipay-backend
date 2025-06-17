import { Router } from "express";
import { createWallet, getAllWallets, getWallet, getWalletByUser } from "../controllers/walletController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const walletRouter = Router();

walletRouter.get('/', getAllWallets);
walletRouter.post('/', createWallet);
// Rotas seguras (Autenticação JWT)
walletRouter.get('/user/id', verifyJWT, getWalletByUser);
walletRouter.get('/:id', verifyJWT, getWallet);

export default walletRouter;