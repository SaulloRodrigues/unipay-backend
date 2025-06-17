import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../config/prismaClient.js";

// Busca e devolve uma lista com todas as carteiras encontradas. 
export async function getWallets() {
    const wallets = await prisma.wallets.findMany();

    // Lança um erro se caso não encontrar nada.
    if (!wallets || wallets.length === 0) {
        throw new Error("Nenhuma carteira cadastrada.");
    }

    return wallets;
}

export async function getWalletByUserId(id) {
    const wallet = await prisma.wallets.findUnique({
        where: { user_id: Number(id)
        }
    });

    // Lança um erro se não encontrar a carteira solicitada.
    if (!wallet) {
        throw new Error("Carteira não encontrada.");
    }

    return wallet;
}

// Busca uma carteira pelo ID.
export async function getWalletById(walletId) {
    const wallet = await prisma.wallets.findUnique({
        where: {
            id: Number(walletId)
        }
    });

    // Lança um erro se não encontrar a carteira solicitada.
    if (!wallet) {
        throw new Error("Carteira não encontrada.");
    }

    return wallet;
}

// Cria uma nova carteira para um usuário existente
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

// Atualiza o valor da carteira pelo ID.
export async function updateWalletAmount(walletId, newAmount) {
    const updatedWallet = await prisma.wallets.update({
        where: {
            id: walletId
        },
        data: {
            amount: new Decimal(String(newAmount))
        }
    });

    // Lança um erro se não encontrar a carteira passada.
    if (!updatedWallet) {
        throw new Error("Erro ao atualizar a carteira.");
    }

    return updatedWallet;
}
