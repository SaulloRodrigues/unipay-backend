import { Router } from "express";
import { createWallet, getAllWallets, getWallet, updateWallet } from "../controllers/walletController.js";

const walletRouter = Router();

walletRouter.get('/', getAllWallets);
walletRouter.get('/:id', getWallet);
walletRouter.post('/', createWallet);
walletRouter.patch('/', updateWallet);

export default walletRouter;