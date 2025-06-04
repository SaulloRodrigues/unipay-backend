export async function getWallet(req, res) {
    const {id} = req.params;
    // Lógica a ser implementada.
}

export async function createWallet(req, res) {
    const {userId} = req.body;
  
    // Caso o campo UserId não existe, ele retorna um erro.
    if (!userId) {
      return res.status(401).json({ message: "Campo incompleto." })
    }

    const newWallet = {
        id: crypto.randomUUID(),
        userId: userId,
        value: 10000
    }

    // Lógica a ser implementada para salvar no banco de dados.

    return res.status(200).json({message: "Carteira criada com sucesso", newWallet});
  
}