import jwt from "jsonwebtoken";

export function verifyJWT(req, res, next) {
    // Tenta buscar o token se o mesmo existir em Authorization ou no Cookie "user-data".
    const authHeader = req.headers.authorization?.split(' ')[1];
    const authCookie = req.cookies?.['user-data'];

    // Define o token como o que for o válido a encontrar primeiro: pelo Cookie ou pelo Authorization.
    const token = authCookie || authHeader;

    // Caso o token não seja fornecido em nenhuma das formas acima...
    if (!token) {
        return res.status(401).json({ message: "Nenhum token fornecido." });
    }

    try {
        // Verifica e decodifica o token JWT utilizando a chave privada.
        const decodedJWT = jwt.verify(token, process.env.PRIVATE_KEY);
        // Armazena o payload decodificado em "req.user" para usar nas próximas rotas.
        req.user = decodedJWT;
        // Chamando o próximo middleware.
        next();
    } catch (error) {
        // Caso o token não seja válido ou esteja expirado...
        return res.status(403).json({ message: "Usuário não autorizado, o token fornecido é inválido!" })
    }
}