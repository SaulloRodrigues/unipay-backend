import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../config/prismaClient.js";

export async function getWallets() {
    const wallets = await prisma.wallets.findMany();

    if (!wallets || wallets.length === 0) {
        throw new Error("Nenhuma carteira cadastrada.");
    }

    return wallets;
}

export async function getWalletById(walletId) {
    const wallet = await prisma.wallets.findUnique({
        where: {
            id: Number(walletId)
        }
    });

    if (!wallet) {
        throw new Error("Carteira não encontrada.");
    }

    return wallet;
}

export async function createWalletUser(userId) {

    const newWallet = await prisma.wallets.create({
        data: {
            user_id: userId,
            amount: new Decimal("10000.00"), // Valor inicial da carteira - 10K
        }
    });

    if (!newWallet) {
        throw new Error("Erro ao criar a carteira.");
    }

    return newWallet;
}

export async function updateWalletAmount(walletId, newAmount) {
    const updatedWallet = await prisma.wallets.update({
        where: {
            id: walletId
        },
        data: {
            amount: new Decimal(String(newAmount))
        }
    });

    if (!updatedWallet) {
        throw new Error("Erro ao atualizar a carteira.");
    }

    return updatedWallet;
}
