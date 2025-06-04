import argon2 from 'argon2'

// Tese de simulação de um bd.
const users = [];

export async function getAllUsers(req, res) {
  res.status(200).json(users);
  // Lógica a ser implementada
}

export async function getUser(req, res) {
  const { id } = req.params;

  // Lógica a ser implementada
}

export async function loginUser(req, res) {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(401).json({message: "Campos faltando."});
  }

  // lógica a ser implementada do bd ainda.

  // Verifica se a senha informada está correta.
  const hasWrongPassword = !await argon2.verify("campo que vai vir do banco de dados",password);

  if (hasWrongPassword) {
    return res.status(403).json({message: "Usuário não autorizado."})
  }

  return res.status(201).json({message: "Usuário autorizado com sucesso."})
}

export async function createUser(req, res) {
  // Campos necessários para criar o usuário.
  const requiredFields = ["name", "surname", "age", "email", "password"];

  const body = req.body;

  // Booleano - verifica se tem campos faltando.
  const hasMissingFields = requiredFields.some(field => !body[field]);

  // Caso tenha campos faltando ele retorna com um erro.
  if (hasMissingFields) {
    return res.status(401).json({ message: "Campos incompletos." })
  }

  // Senha hasheada para ser salva no db.
  const passwordHashed = await argon2.hash(body.password);

  // Estrutura para um novo usuário.
  const newUser = {
    id: crypto.randomUUID(),
    name: body.name,
    surname: body.surname,
    age: body.age,
    email: body.email,
    password: passwordHashed
  };

  users.push({ ...newUser });

  return res.status(200).json(newUser)

}

export async function updateUser(req, res) {
  const { id } = req.params
  const { name, surname, age, email, password } = req.body;

  // Lógica a ser implementada.
}


export async function deleteUser(req, res) {
  const { id } = req.params;

  // Lógica a ser implementada.
}