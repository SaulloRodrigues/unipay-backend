import { authUser, createNewUser, getUserById, getUsers } from '../services/userService.js';

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
    return res.status(200).json(user);
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
    return res.status(401).json({ message: "Campos faltando na requisição." })
  }

  try {
    const user = await createNewUser(body);
    return res.status(201).json(user);
  } catch (erro) {
    return res.status(500).json({ message: erro.message });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params
  const { name, surname, birth_date, email, password } = req.body;

  // Lógica a ser implementada.
}


export async function deleteUser(req, res) {
  const { id } = req.params;

  // Lógica a ser implementada.
}