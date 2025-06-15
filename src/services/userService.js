import prisma from '../config/prismaClient.js';
import argon2 from 'argon2';

// Busca todos os usuários no banco, tentando trazer apenas algumas informações.
export async function getUsers() {
    const users = await prisma.users.findMany({
        select: {
            id: true,
            name: true,
            surname: true,
            email: true,
        }
    });

    if (!users || users.length === 0) {
        throw new Error("Nenhum usuário cadastrado.");
    }

    return users;
}

// Busca um usuário pelo email, tentando trazer algumas informações públicas.
export async function getUserByEmail(email) {
    const user = await prisma.users.findUnique({
        where: { email: email },
        select: {
            id: true,
            name: true,
            surname: true,
            email: true,
        }
    });

    if (!user) {
        throw new Error("Usuário com o email fornecido não encontrado.");
    }

    return user;
}

// Busca um usuário pelo ID. Lança um erro se ele não encontrar ninguém.
export async function getUserById(id) {
    const user = await prisma.users.findUnique({
        where: { id: Number(id) },
    });

    if (!user) {
        throw new Error("Usuário com o id fornecido não encontrado.");
    }

    return user;
}

// Autentica o usuário comparando o password_hash no banco com a senha informada.
export async function authenticateUser(data) {
    const { email, password } = data;

    const user = await prisma.users.findUnique({
        where: { email }
    });

    const isPasswordValid = await argon2.verify(user.password_hash, password);

    if (!user || !isPasswordValid) {
        throw new Error("Usuário ou senha inválido.");
    }

    return user;
}

// Cria um usuário no banco depois de fazer o hash da senha.
export async function createNewUser(data) {

    const passwordHashed = await argon2.hash(data.password);

    const newUser = await prisma.users.create({
        data: {
            name: data.name,
            surname: data.surname,
            birth_date: new Date(data.birth_date),
            email: data.email,
            password_hash: passwordHashed
        }
    });

    if (!newUser) {
        throw new Error("Erro ao criar um novo usuário.");
    }

    return newUser;
}

// Atualiza o usuário pelo ID, faz o hash da nova senha se ela for passada.
export async function updateUserById(id, data) {
    try {
        const user = await getUserById(id);

        // Verifica se o usuário passou a senha, se sim, faz o hash da senha nova, se não, mantém o hash da senha antiga.
        // Está verificação é importante pois caso o usuário não passe uma senha, o Argon2 irá tentar fazer o hash e irá dar erro, pois o mesmo espera uma string.
        let passwordHashed = data.password ? await argon2.hash(data.password) : user.password_hash;

        const updatedUser = await prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                name: data.name || user.name,
                surname: data.surname || user.surname,
                email: data.email || user.email,
                password_hash: passwordHashed,
            }
        });

        return updatedUser;
    } catch (erro) {
        throw new Error(erro.message);
    }
}

// Exclui o usuário pelo ID. Se ele não existe, lança um erro.
export async function deleteUserById(id) {
    try {
        const user = await prisma.users.delete({
            where: {
                id: Number(id),
            }
        });

        return user;
    } catch (erro) {
        throw new Error("Erro ao deletar o usuário.");
    }
}