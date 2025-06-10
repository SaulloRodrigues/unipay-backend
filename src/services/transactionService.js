import prisma from "../config/prismaClient.js";
import { Decimal } from "@prisma/client/runtime/library";
import { getWalletById, updateWalletAmount } from "./walletService.js";

export async function getAllTransactions() {
    // Lógica para obter todas as transações...

}

export async function getTransactionById(id) {
    // Lógica para obter uma transação específica por ID...
}

export async function getTransactionsByWalletId(wallet_id) {
    // Lógica para obter todas as transações de uma carteira específica...
}

export async function createWithdrawalTransaction(data) {
    const { wallet_origin_id, amount } = data;

    try {
        const wallet = await getWalletById(wallet_origin_id);
        const walletAmountInNumber = wallet.amount.toNumber();

        if (walletAmountInNumber < amount || amount <= 0) {
            throw new Error("Saldo insuficiente ou valor inválido para saque.");
        }

        const newWithdrawal = await prisma.transactions.create({
            data: {
                wallet_origin_id: wallet_origin_id,
                amount: amount,
                type: "WITHDRAWAL",
                status: "SUCESS"
            }
        });

        const newAmountWallet = new Decimal(String(walletAmountInNumber - amount));

        // Fazendo a atualização do valor da carteira
        await updateWalletAmount(wallet_origin_id, newAmountWallet);

        return newWithdrawal;

    } catch (erro) {

        throw new Error("Erro ao realizar o saque: " + erro.message);
    }

}



export async function createDepositTransaction(data) {
    const { wallet_origin_id, amount } = data;

    try {
        const wallet = await getWalletById(wallet_origin_id);

        if (amount < 0.01) {
            throw new Error("Valor inválido para depósito.");
        }

        const newDeposit = await prisma.transactions.create({
            data: {
                wallet_origin_id: wallet_origin_id,
                amount: amount,
                type: "DEPOSIT",
                status: "SUCESS"
            }
        });

        const newAmountTransaction = new Decimal(String(wallet.amount.toNumber() + amount));


        // Fazendo a atualização do valor na carteira
        await updateWalletAmount(wallet_origin_id, newAmountTransaction);

        return newDeposit;

    } catch (erro) {
        throw new Error("Erro ao realizar o depósito: " + erro.message);
    }
}

export async function createTransferTransaction(data) {
    const { wallet_origin_id, wallet_recipient_id, amount } = data;

    try {
        const fromWallet = await getWalletById(wallet_origin_id);
        const toWallet = await getWalletById(wallet_recipient_id);

        if (fromWallet.amount.toNumber() < amount || amount <= 0) {
            throw new Error("Saldo insuficiente ou valor inválido para transferência.");
        }

        // Criando a transação de transferência
        const newTransfer = await prisma.transactions.create({
            data: {
                wallet_origin_id: wallet_origin_id,
                wallet_recipient_id: wallet_recipient_id,
                amount: amount,
                type: "TRANSFER",
                status: "SUCESS"
            }
        });

        const newFromAmount = new Decimal(String(fromWallet.amount.toNumber() - amount));
        const newToAmount = new Decimal(String(toWallet.amount.toNumber() + amount));

        // Atualizando os valores das carteiras
        await updateWalletAmount(wallet_origin_id, newFromAmount);
        await updateWalletAmount(wallet_recipient_id, newToAmount);

        return newTransfer;

    } catch (erro) {
        throw new Error("Erro ao realizar a transferência: " + erro.message);
    }

}