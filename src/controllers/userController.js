import { authUser, createNewUser, getUserById, getUsers, updateUserById, deleteUserById } from '../services/userService.js';

export async function getAllUsers(req, res) {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (erro) {
    return res.status(500).json({ message: erro.message });
  }
}

export async function getUser(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({ message: "Você precisa fornecer o ID." });
  }

  try {
    const user = await getUserById(id);
    return res.status(200).json({ message: "Usuário encontrado com sucesso", user });
  } catch (erro) {
    return res.status(404).json({ message: erro.message });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "Campos faltando na requisição." });
  }

  try {
    const user = await authUser({ email, password });
    return res.status(200).json({ message: "Usuário autenticado com sucesso.", user });
  } catch (erro) {
    return res.status(403).json({ message: erro.message });
  }
}

export async function createUser(req, res) {
  // Campos necessários para criar o usuário.
  const requiredFields = ["name", "surname", "birth_date", "email", "password"];

  const body = req.body;

  // Booleano - verifica se tem campos faltando.
  const hasMissingFields = requiredFields.some(field => !body[field]);

  // Caso tenha campos faltando ele retorna com um erro.
  if (hasMissingFields) {
    return res.status(400).json({ message: "Campos faltando na requisição." })
  }

  try {
    const user = await createNewUser(body);
    return res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (erro) {
    // Tratando o erro de usuário já existente.
    // O erro P2002 é um erro do Prisma que indica que há uma violação de unique constraint.
    if (erro.code === "P2002" && erro.meta?.target?.includes("email")) {
      return res.status(409).json({ message: "Já existe um usuário com estes dados." });
    }
    return res.status(500).json({ message: erro.message });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params
  const { name, surname, email, password } = req.body;
  try {
    const user = await updateUserById(id, { name, surname, email, password });
    return res.status(200).json({ message: "Usuário atualizado com sucesso", user });
  } catch (erro) {
    return res.status(500).json({ message: erro.message });
  }
}


export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await deleteUserById(id);
    return res.status(200).json({ message: "Usuário deletado com sucesso", user });
  }
  catch (erro) {
    return res.status(500).json({ message: erro.message });
  }
}