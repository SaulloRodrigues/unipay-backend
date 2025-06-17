import { createDepositTransaction, createTransferTransaction, createWithdrawalTransaction, getAllTransactionsByWalletId, getTransactionById, getTransactions } from "../services/transactionService.js";

// Função para obter todas as transações cadastradas.
export async function getAllTransactions(req, res) {
    try {
        const transactions = await getTransactions();
        return res.status(200).json({ message: "Transações obtidas com sucesso", transactions })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// Função para obter uma transação cadastrada.
export async function getTransaction(req, res) {
    const { id } = req.params;
    try {
        const transaction = await getTransactionById(id);
        return res.status(200).json({ message: "Transação obtida com sucesso", transaction });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Função para obter todas as transações associadas a uma carteira
export async function getTransactionsByWalletId(req, res) {
    const { id } = req.params;
    try {
        const transactions = await getAllTransactionsByWalletId(id);
        return res.status(200).json({ message: "Transações da carteira obtidas com sucesso.", transactions })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Função para processar o endpoint de saque de uma carteira.
export async function withdrawalTransaction(req, res) {
    const { amount } = req.body;
    const wallet_origin_id = req.user?.id

    if (!wallet_origin_id) {
        return res.status(401).json({ message: "ID inválido ou inexistente." });
    }

    try {
        const newWithdrawalTransaction = await createWithdrawalTransaction({
            wallet_origin_id: Number(wallet_origin_id),
            amount: Number(amount)
        });

        return res.status(201).json({ message: "Saque realizado com sucesso!", transaction: newWithdrawalTransaction });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Função para processar o endpoint de depósito de uma carteira.
export async function depositTransaction(req, res) {
    const { amount } = req.body;
    const wallet_origin_id = req.user?.id

    if (!wallet_origin_id) {
        return res.status(401).json({ message: "ID inválido ou inexistente." });
    }
    try {
        const newDepositTransaction = await createDepositTransaction({
            wallet_origin_id: Number(wallet_origin_id),
            amount: Number(amount)
        });

        return res.status(201).json({ message: "Depósito realizado com sucesso!", transaction: newDepositTransaction });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

// Função para processar o endpoint de transferência entre duas carteiras.
export async function transferTransaction(req, res) {
    const { wallet_recipient_id, amount } = req.body;
    const wallet_origin_id = req.user?.id;

    if (!wallet_origin_id) {
        return res.status(401).json({ message: "ID inválido ou inexistente." });
    }
    
    try {
        const newTransferTransaction = await createTransferTransaction({
            wallet_origin_id: Number(wallet_origin_id),
            wallet_recipient_id: Number(wallet_recipient_id),
            amount: Number(amount)
        });

        return res.status(201).json({ message: "Transferência realizada com sucesso!", transaction: newTransferTransaction });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}