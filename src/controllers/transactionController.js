import { createDepositTransaction, createTransferTransaction, createWithdrawalTransaction } from "../services/transactionService.js";

export async function withdrawalTransaction(req, res) {
    const { wallet_origin_id, amount } = req.body;
    try {
        const newWithdrawalTransaction = await createWithdrawalTransaction({
            wallet_origin_id: Number(wallet_origin_id),
            amount: Number(amount)
        });

        return res.status(201).json({ message: "Saque realizado com sucesso!", transaction: newWithdrawalTransaction });
    } catch (error) {
        return res.status(400).json({ message: "Erro ao realizar o saque: " + error.message });
    }
}

export async function depositTransaction(req, res) {
    const { wallet_origin_id, amount } = req.body;
    try {
        const newDepositTransaction = await createDepositTransaction({
            wallet_origin_id: Number(wallet_origin_id),
            amount: Number(amount)
        });

        return res.status(201).json({ message: "Depósito realizado com sucesso!", transaction: newDepositTransaction });
    } catch (error) {
        return res.status(400).json({ message: "Erro ao realizar o depósito: " + error.message });
    }

}

export async function transferTransaction(req, res) {
    const { wallet_origin_id, wallet_recipient_id, amount } = req.body;

    try {
        const newTransferTransaction = await createTransferTransaction({
            wallet_origin_id: Number(wallet_origin_id),
            wallet_recipient_id: Number(wallet_recipient_id),
            amount: Number(amount)
        });

        return res.status(201).json({ message: "Transferência realizada com sucesso!", transaction: newTransferTransaction });
    } catch (error) {
        return res.status(400).json({ message: "Erro ao realizar a transferência: " + error.message });
    }
}