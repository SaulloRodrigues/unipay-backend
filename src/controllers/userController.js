import { createNewUser, getUsers, updateUserById, deleteUserById, getUserByEmail, authenticateUser, getUserById } from '../services/userService.js';
import jwt from 'jsonwebtoken'

// Busca todos os usuários no banco.
export async function getAllUsers(req, res) {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (erro) {
    return res.status(404).json({ message: erro.message });
  }
}

// Busca um usuário pelo ID, verifica se o ID é válido primeiro.
export async function getUser(req, res) {
  const id = req.user?.id

  if (!id) {
    return res.status(401).json({ message: "ID inválido ou inexistente." });
  }

  try {
    const user = await getUserById(id);
    return res.status(200).json({ message: "Usuário encontrado com sucesso", user });
  } catch (erro) {
    return res.status(404).json({ message: erro.message });
  }
}

// Busca um usuário pelo email, verifica se o email foi fornecido.
export async function getUserWithEmail(req, res) {
  const { email } = req.params;

  console.log(email)

  if (!email) {
    return res.status(401).json({ message: "Você precisa fornecer o email." });
  }

  try {
    const user = await getUserByEmail(email);
    console.log(user)
    return res.status(200).json({ message: "Usuário encontrado com sucesso", user });
  } catch (erro) {
    return res.status(404).json({ message: erro.message });
  }
}

// Autentica o usuário pelo email e senha, depois gera um JWT.
export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "Campos faltando na requisição." });
  }

  try {
    const user = await authenticateUser({ email, password });

    const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, { expiresIn: '8h' });

    res.cookie('user-data', token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 8 * 60 * 60 * 1000,
      path: '/'
    })

    return res.status(200).json({ message: "Usuário autenticado com sucesso.", user });
  } catch (erro) {
    return res.status(403).json({ message: erro.message });
  }
}

// Dentro do seu controller (userController.js)

export async function logoutUser(req, res) {
  res.cookie('user-data', '', {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
    path: '/'
  });

  return res.status(200).json({ message: "Usuário deslogado com sucesso." });
}


// Cria um usuário depois de verificar se todos os campos obrigatórios estão presentes.
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

// Atualiza o usuário autenticado pelo seu ID.
export async function updateUser(req, res) {
  const { name, surname, email, password } = req.body;

  const id = req.user?.id

  if (!id) {
    return res.status(404).json({ message: "ID inválido ou inexistente." });
  }

  try {
    const user = await updateUserById(id, { name, surname, email, password });
    return res.status(200).json({ message: "Usuário atualizado com sucesso", user });
  } catch (erro) {
    return res.status(500).json({ message: erro.message });
  }
}

// Exclui o usuário autenticado pelo seu ID.
export async function deleteUser(req, res) {
  const id = req.user?.id

  if (!id) {
    return res.status(404).json({ message: "ID inválido ou inexistente." });
  }

  try {
    const user = await deleteUserById(id);
    return res.status(200).json({ message: "Usuário deletado com sucesso", user });
  }
  catch (erro) {
    return res.status(500).json({ message: erro.message });
  }
}