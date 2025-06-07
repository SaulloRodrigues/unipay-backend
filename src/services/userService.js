import prisma from '../config/prismaClient.js';
import argon2 from 'argon2';
export async function getUsers() {
    const users = await prisma.users.findMany({
        select: {
            id: true,
            name: true,
            surname: true,
            email: true,
        }
    });

    if (!users) {
        throw new Error("Erro ao obter os usuários.");
    }

    return users;
}

export async function getUserById(id) {
    const user = await prisma.users.findUnique({
        where: { id: Number(id) },
    });

    if (!user) {
        throw new Error("Usuário não encontrado.");
    }

    return user;
}

export async function authUser(data) {
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

// Vou ter que alterar a lógica de UpdateUserById, não tá fazendo sentido, ela não está retornando o usuário atualizado, e sim o usuário antigo.

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

export async function deleteUserById(id) {
    const user = getUserById(id);

    if (user) {
        const delete_user = await prisma.users.delete({
            where: {
                id: user.id,
            },
        });

        return true;
    }

    return false;

}