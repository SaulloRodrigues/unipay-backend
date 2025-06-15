import jwt from "jsonwebtoken";

// Middleware que verifica se o usuário fez login, tentando encontrar o JWT no Authorization ou no cookie "user-data".
export function verifyJWT(req, res, next) {
    // Tenta buscar o token JWT tanto no Authorization quanto no cookie "user-data".
    const authHeader = req.headers.authorization?.split(' ')[1];
    const authCookie = req.cookies?.['user-data'];

    // Define o token como o que encontrar primeiro (cookie ou authorization).
    const token = authCookie || authHeader;

    // Se ele não encontrar o token em nenhum dos dois, responde com 401.
    if (!token) {
        return res.status(401).json({ message: "Nenhum token fornecido." });
    }

    try {
        // Verifica e decodifica o token JWT utilizando a private key.
        const decodedJWT = jwt.verify(token, process.env.PRIVATE_KEY);
        // Armazena o payload decodificado no objeto "req" para usar nas próximas rotas.
        req.user = decodedJWT;
        // Chamando o próximo middleware.
        next();
    } catch (error) {
        // Se o token for inválido ou expirado, responde com 403.
        return res.status(403).json({ message: "Usuário não autorizado, o token fornecido é inválido!" })
    }
}