import { Router } from "express";
import { createWallet, getWallet } from "../controllers/walletController.js";

const walletRouter = Router();

walletRouter.get('/', getWallet);
walletRouter.post('/', createWallet);

export default walletRouter;