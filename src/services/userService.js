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
        select: {
            id: true,
            name: true,
            surname: true,
            email: true,
        }
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

export async function updateUser(id,data) {
 const user= await getUserById(id);
 const passwordHashed = await argon2.hash(data.password);

 if(user){
    const update_user = await prisma.users.update({
        where : {
            id : user.id,
        },
        data: {
                name  : data.name || user.name,
                surname : data.surname || user.surname,
                email : data.email || user.email,
                password_hash : passwordHashed || user.password_hash, 
        }
    })
  }
  return user;
}

export async function deleteUser(id) {
    const user = getUserById(id);

    if(user){
        const delete_user = await prisma.users.delete({
            where:{
                id: user.id,
            },
        });

        return true;
    }

    return false;
    
}