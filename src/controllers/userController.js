export async function obterUsuarios(req, res) {
  const usuariosTeste = [{ name: "Saullo", senha: "teste" }, {name: "Rodrigues", senha: "teste2"}];
  res.status(200).json(usuariosTeste)
}