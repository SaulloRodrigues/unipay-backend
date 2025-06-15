import { createWalletUser, getWalletById, getWallets } from "../services/walletService.js";

// Busca e responde com a lista de todas as carteiras.
export async function getAllWallets(req, res) {
    try {
        const wallets = await getWallets();
        return res.status(200).json({ message: "Carteiras encontradas com sucesso", wallets });
    } catch (erro) {
        return res.status(404).json({ message: erro.message });
    }
}

// Busca a carteira pelo seu id e lista se for encontrada.
export async function getWallet(req, res) {
    const { id } = req.params;

    try {
        const wallet = await getWalletById(id);
        return res.status(200).json({ message: "Carteira encontrada com sucesso", wallet });
    } catch (erro) {
        return res.status(404).json({ message: erro.message });
    }
}

// Cria uma nova carteira para um usuário, e verifica se ele já possui uma.
export async function createWallet(req, res) {
    const { user_id } = req.body;

    try {
        const newWallet = await createWalletUser(user_id);
        return res.status(201).json({ message: "Carteira criada com sucesso", newWallet });
    } catch (erro) {
        // Tratando o erro de carteira já existente e referenciado a um usuário.
        // O erro P2002 é um erro do Prisma que indica que há uma violação de unique constraint.
        if (erro.code === "P2002" && erro.meta?.target?.includes("user_id")) {
            return res.status(409).json({ message: "Já existe uma carteira para esse usuário." });
        }

        return res.status(500).json({ message: erro.message });
    }
}