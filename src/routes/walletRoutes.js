import { Router } from "express";
import { createWallet, getAllWallets, getWallet } from "../controllers/walletController.js";

const walletRouter = Router();

walletRouter.get('/', getAllWallets);
walletRouter.get('/:id', getWallet);
walletRouter.post('/', createWallet);

export default walletRouter;