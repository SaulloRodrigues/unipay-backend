import prisma from "../config/prismaClient.js";
import { Decimal } from "@prisma/client/runtime/library";
import { getWalletById, updateWalletAmount } from "./walletService.js";

// Retorna todas as transações cadastradas no banco.
export async function getTransactions() {
    const transactions = await prisma.transactions.findMany();
    if (!transactions || transactions.length === 0) {
        throw new Error('Nenhuma transação cadastrada.');
    }
    return transactions;
}

// Busca uma transação específica pelo seu ID.
export async function getTransactionById(id) {
    const transaction = await prisma.transactions.findUnique({
        where: { id: Number(id) }
    });
    if (!transaction) {
        throw new Error("Transação inexistente.");
    }
    return transaction;
}

// Retorna todas as transações ligadas a uma carteira específica.
export async function getAllTransactionsByWalletId(wallet_id) {
    const transactions = await prisma.transactions.findMany({
        where: {
            OR: [
                { wallet_origin_id: Number(wallet_id) },
                { wallet_recipient_id: Number(wallet_id) }
            ]
        }
    });
    if (!transactions || transactions.length === 0) {
        throw new Error("Nenhuma transação cadastrada.");
    }
    return transactions;
}

// Cria uma transação de saque e atualiza o saldo da carteira de origem.
export async function createWithdrawalTransaction(data) {
    const { wallet_origin_id, amount } = data;

    const wallet = await getWalletById(wallet_origin_id);
    const currentBalance = wallet.amount.toNumber();

    if (currentBalance < amount || amount <= 0) {
        throw new Error("Saldo insuficiente ou valor inválido para saque.");
    }

    const newWithdrawal = await prisma.transactions.create({
        data: {
            wallet_origin_id,
            amount,
            type: "WITHDRAWAL",
            status: "SUCCESS"
        }
    });

    const updatedBalance = new Decimal(String(currentBalance - amount));
    await updateWalletAmount(wallet_origin_id, updatedBalance);

    return newWithdrawal;
}

// Cria uma transação de depósito e atualiza o saldo da carteira.
export async function createDepositTransaction(data) {
    const { wallet_origin_id, amount } = data;

    if (amount < 0.01) {
        throw new Error("Valor inválido para depósito.");
    }

    const wallet = await getWalletById(wallet_origin_id);
    const newDeposit = await prisma.transactions.create({
        data: {
            wallet_origin_id,
            amount,
            type: "DEPOSIT",
            status: "SUCCESS"
        }
    });

    const updatedBalance = new Decimal(String(wallet.amount.toNumber() + amount));
    await updateWalletAmount(wallet_origin_id, updatedBalance);

    return newDeposit;
}

// Realiza transferência entre duas carteiras e atualiza ambos os saldos.
export async function createTransferTransaction(data) {
    const { wallet_origin_id, wallet_recipient_id, amount } = data;

    const fromWallet = await getWalletById(wallet_origin_id);
    const toWallet = await getWalletById(wallet_recipient_id);

    if (fromWallet.amount.toNumber() < amount || amount <= 0) {
        throw new Error("Saldo insuficiente ou valor inválido para transferência.");
    }

    const newTransfer = await prisma.transactions.create({
        data: {
            wallet_origin_id,
            wallet_recipient_id,
            amount,
            type: "TRANSFER",
            status: "SUCCESS"
        }
    });

    const newFromBalance = new Decimal(String(fromWallet.amount.toNumber() - amount));
    const newToBalance = new Decimal(String(toWallet.amount.toNumber() + amount));

    await updateWalletAmount(wallet_origin_id, newFromBalance);
    await updateWalletAmount(wallet_recipient_id, newToBalance);

    return newTransfer;
}